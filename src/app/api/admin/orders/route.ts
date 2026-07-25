/**
 * src/app/api/admin/orders/route.ts  — GET all orders
 * src/app/api/admin/orders/[id]/route.ts — PATCH order status
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: { product: { select: { name: true, images: true } } },
        },
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("[GET /api/admin/orders]", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
