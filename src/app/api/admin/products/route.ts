/**
 * src/app/api/admin/products/route.ts
 *
 * POST /api/admin/products — Create a new product
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name, description, basePrice, salePrice,
      category, collection, images, fabricTags,
      fabricDetails, careInstructions, sizes,
    } = body;

    if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!description?.trim()) return NextResponse.json({ error: "Description is required" }, { status: 400 });
    if (!basePrice || isNaN(Number(basePrice))) return NextResponse.json({ error: "Valid base price is required" }, { status: 400 });
    if (!category) return NextResponse.json({ error: "Category is required" }, { status: 400 });
    if (!collection) return NextResponse.json({ error: "Collection is required" }, { status: 400 });

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        basePrice: Number(basePrice),
        salePrice: salePrice ? Number(salePrice) : null,
        category,
        collection,
        images: Array.isArray(images) ? images.filter(Boolean) : [],
        fabricTags: Array.isArray(fabricTags) ? fabricTags.filter(Boolean) : [],
        fabricDetails: fabricDetails?.trim() ?? "",
        careInstructions: careInstructions?.trim() ?? "",
        rating: 0,
        sizes: {
          createMany: {
            data: (sizes ?? []).map((s: { size: string; stockCount: number; weightRange: string; heightRange: string }) => ({
              size: s.size,
              stockCount: Number(s.stockCount) || 0,
              weightRange: s.weightRange ?? "",
              heightRange: s.heightRange ?? "",
            })),
          },
        },
      },
      include: { sizes: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("[POST /api/admin/products]", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
