import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { sendWhatsAppUpdate } from "@/lib/whatsapp";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { status } = await request.json();

    const validStatuses = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    // Send WhatsApp notification
    if (order.status !== "PENDING") {
      await sendWhatsAppUpdate(
        order.phone,
        order.fullName,
        order.id,
        order.status
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("[PATCH /api/admin/orders/[id]]", error);
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
  }
}
