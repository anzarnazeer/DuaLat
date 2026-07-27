import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const order = await prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        createdAt: true,
        totalPrice: true,
        fullName: true,
        city: true,
        state: true,
        items: {
          select: {
            id: true,
            quantity: true,
            selectedSize: true,
            priceAtTime: true,
            product: {
              select: {
                id: true,
                name: true,
                images: true,
              }
            }
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("[GET /api/orders/[id]]", error);
    return NextResponse.json({ error: "Failed to fetch order details" }, { status: 500 });
  }
}
