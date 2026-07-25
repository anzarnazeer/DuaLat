/**
 * src/app/api/products/[id]/route.ts
 *
 * ENDPOINT: GET /api/products/:id
 *
 * WHAT THIS DOES: Fetches a single product by its ID, including
 * all its sizes and reviews.
 *
 * CONCEPTS TAUGHT HERE:
 * 1. Dynamic route segments — the [id] folder name creates a URL parameter
 * 2. Accessing route params in Route Handlers via the context argument
 * 3. Prisma `findUnique` — fetches exactly one record by a unique field
 * 4. Returning a 404 response when a resource doesn't exist
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

// CONCEPT: Route Handler context — the second argument provides `params`,
// which contains the dynamic segment values. For this file at [id]/route.ts,
// params.id will be whatever is in the URL after /api/products/.
// Note: params is a Promise in this version of Next.js (must be awaited).
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // CONCEPT: `findUnique` is used when you know the field is guaranteed unique
    // (it's the primary key `@id` in our schema). It's more efficient than `findFirst`.
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        sizes: {
          orderBy: { size: "asc" }, // Order sizes predictably
        },
        reviews: {
          orderBy: { createdAt: "desc" }, // Newest reviews first
        },
      },
    });

    // CONCEPT: If the product doesn't exist, return 404 (Not Found).
    // This is important for SEO and correct HTTP semantics.
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);

  } catch (error) {
    console.error("[GET /api/products/[id]] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
