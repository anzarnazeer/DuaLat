/**
 * src/app/api/products/route.ts
 *
 * ENDPOINT: GET /api/products
 *
 * WHAT THIS DOES: Returns a list of all products from the database.
 * Supports optional query parameter filtering:
 *   - ?category=girls
 *   - ?collection=basics
 *   - ?category=unisex&collection=loungewear
 *
 * CONCEPTS TAUGHT HERE:
 * 1. Route Handlers — the `route.ts` file convention in Next.js App Router
 * 2. Reading URL query parameters from a Request object
 * 3. Prisma `findMany` with a dynamic `where` filter
 * 4. Returning JSON responses with NextResponse.json()
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // CONCEPT: `request.nextUrl.searchParams` is a URLSearchParams object.
    // It parses the query string for us — e.g. "?category=girls" → get('category') = "girls"
    const { searchParams } = request.nextUrl;
    const category = searchParams.get("category");
    const collection = searchParams.get("collection");

    // CONCEPT: Build a dynamic Prisma `where` clause.
    // We only add a filter if the query param was actually provided.
    // This is a common pattern to avoid writing many if/else branches.
    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    if (collection) where.collection = collection;

    // CONCEPT: `findMany` is the Prisma equivalent of SELECT * FROM products.
    // `include` tells Prisma to JOIN and fetch related records in the same query.
    // Without `include: { sizes: true }`, the sizes array would not be returned.
    const products = await prisma.product.findMany({
      where,
      include: {
        sizes: true,      // Include all size/stock info
        reviews: {
          orderBy: { createdAt: "desc" }, // Most recent reviews first
        },
      },
      orderBy: { createdAt: "desc" }, // Newest products first
    });

    // CONCEPT: NextResponse.json() creates a Response with:
    // - Content-Type: application/json header set automatically
    // - The data serialized to JSON
    // - HTTP 200 status by default
    return NextResponse.json(products);

  } catch (error) {
    // CONCEPT: Always wrap database calls in try/catch.
    // Return a 500 error to the client if something goes wrong.
    // NEVER expose the raw error message to clients in production
    // (it may contain sensitive DB info).
    console.error("[GET /api/products] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
