/**
 * src/app/api/admin/stats/route.ts
 *
 * ENDPOINT: GET /api/admin/stats
 * Returns dashboard KPIs: product count, order count, revenue, review count.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // Run all aggregations in parallel for performance
    const [
      totalProducts,
      totalOrders,
      totalReviews,
      revenueResult,
      recentOrders,
      lowStockItems,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.review.count(),
      prisma.order.aggregate({
        _sum: { totalPrice: true },
        where: { status: { not: "CANCELLED" } },
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          fullName: true,
          email: true,
          totalPrice: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.sizeStock.findMany({
        where: { stockCount: { lte: 3 } },
        include: { product: { select: { name: true } } },
        orderBy: { stockCount: "asc" },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalReviews,
      totalRevenue: revenueResult._sum.totalPrice ?? 0,
      recentOrders,
      lowStockItems,
    });
  } catch (error) {
    console.error("[GET /api/admin/stats]", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
