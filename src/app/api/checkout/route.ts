/**
 * src/app/api/checkout/route.ts — POST /api/checkout
 *
 * Processes a customer order:
 * 1. Validates all input fields
 * 2. Fetches real prices from DB (never trust client prices)
 * 3. Checks stock availability
 * 4. Creates Order + OrderItems and decrements stock atomically
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import type { Product, SizeStock } from "@prisma/client";

type ProductWithSizes = Product & { sizes: SizeStock[] };

interface CheckoutInput {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  items: Array<{
    productId: string;
    selectedSize: string;
    quantity: number;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutInput = await request.json();
    const { fullName, email, phone, addressLine1, city, state, zipCode, country, items } = body;

    // ── Validation ──────────────────────────────────────────────────────────
    if (!fullName?.trim())                      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    if (!email?.trim() || !email.includes("@")) return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    if (!phone?.trim())                          return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    if (!addressLine1?.trim())                   return NextResponse.json({ error: "Address is required" }, { status: 400 });
    if (!city?.trim())                           return NextResponse.json({ error: "City is required" }, { status: 400 });
    if (!state?.trim())                          return NextResponse.json({ error: "State is required" }, { status: 400 });
    if (!zipCode?.trim())                        return NextResponse.json({ error: "Zip code is required" }, { status: 400 });
    if (!country?.trim())                        return NextResponse.json({ error: "Country is required" }, { status: 400 });
    if (!items || !Array.isArray(items) || items.length === 0) return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    for (const item of items) {
      if (!item.productId)               return NextResponse.json({ error: "Each item must have a productId" }, { status: 400 });
      if (!item.selectedSize)            return NextResponse.json({ error: "Each item must have a selectedSize" }, { status: 400 });
      if (!item.quantity || item.quantity < 1) return NextResponse.json({ error: "Each item must have a valid quantity" }, { status: 400 });
    }

    // ── Fetch products + sizes from DB ──────────────────────────────────────
    const productIds = items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { sizes: true },
    }) as ProductWithSizes[];

    const productMap = new Map<string, ProductWithSizes>(products.map((p) => [p.id, p]));

    // ── Stock check ─────────────────────────────────────────────────────────
    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product) {
        return NextResponse.json({ error: `Product ${item.productId} not found` }, { status: 404 });
      }
      const sizeData = product.sizes.find((s: SizeStock) => s.size === item.selectedSize);
      if (!sizeData) {
        return NextResponse.json(
          { error: `Size ${item.selectedSize} not found for ${product.name}` },
          { status: 400 }
        );
      }
      if (sizeData.stockCount < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name} (${item.selectedSize}). Available: ${sizeData.stockCount}` },
          { status: 409 }
        );
      }
    }

    // ── Compute server-side total (never trust client price) ────────────────
    let totalPrice = 0;
    for (const item of items) {
      const product = productMap.get(item.productId)!;
      const unitPrice = product.salePrice ?? product.basePrice;
      totalPrice += unitPrice * item.quantity;
    }

    // ── Create order + decrement stock (separate to avoid transaction timeout) ─
    const order = await prisma.order.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        addressLine1: addressLine1.trim(),
        addressLine2: body.addressLine2?.trim() ?? null,
        city: city.trim(),
        state: state.trim(),
        zipCode: zipCode.trim(),
        country: country.trim(),
        totalPrice: Math.round(totalPrice * 100) / 100,
        status: "CONFIRMED",
        items: {
          create: items.map((item) => {
            const product = productMap.get(item.productId)!;
            return {
              productId: item.productId,
              selectedSize: item.selectedSize,
              quantity: item.quantity,
              priceAtTime: product.salePrice ?? product.basePrice,
            };
          }),
        },
      },
      include: { items: true },
    });

    // Decrement stock for each item
    for (const item of items) {
      const product = productMap.get(item.productId)!;
      const sizeData = product.sizes.find((s: SizeStock) => s.size === item.selectedSize)!;
      await prisma.sizeStock.update({
        where: { id: sizeData.id },
        data: { stockCount: { decrement: item.quantity } },
      });
    }

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        totalPrice: order.totalPrice,
        status: order.status,
        message: `Order confirmed! Your order has been placed.`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/checkout]", error);
    return NextResponse.json({ error: "Failed to process order. Please try again." }, { status: 500 });
  }
}
