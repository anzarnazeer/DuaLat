/**
 * src/app/api/admin/products/[id]/route.ts
 *
 * PUT /api/admin/products/:id  — Update a product
 * DELETE /api/admin/products/:id — Delete a product
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const {
      name, description, basePrice, salePrice,
      category, collection, images, fabricTags,
      fabricDetails, careInstructions,
    } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: name?.trim(),
        description: description?.trim(),
        basePrice: basePrice ? Number(basePrice) : undefined,
        salePrice: salePrice !== undefined ? (salePrice ? Number(salePrice) : null) : undefined,
        category,
        collection,
        images: Array.isArray(images) ? images.filter(Boolean) : undefined,
        fabricTags: Array.isArray(fabricTags) ? fabricTags.filter(Boolean) : undefined,
        fabricDetails: fabricDetails?.trim(),
        careInstructions: careInstructions?.trim(),
      },
      include: { sizes: true, reviews: true },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PUT /api/admin/products/[id]]", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await prisma.product.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("[DELETE /api/admin/products/[id]]", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
