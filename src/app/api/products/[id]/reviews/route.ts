/**
 * src/app/api/products/[id]/reviews/route.ts
 *
 * ENDPOINT: POST /api/products/:id/reviews
 *
 * WHAT THIS DOES: Accepts a new review from the frontend, saves it to
 * the database, then recalculates and updates the product's average rating.
 *
 * CONCEPTS TAUGHT HERE:
 * 1. POST Route Handlers — reading the request body with request.json()
 * 2. Input validation — always validate before touching the DB
 * 3. Prisma `create` — inserting a new record
 * 4. Prisma `aggregate` — computing averages directly in SQL (avg of ratings)
 * 5. Prisma `update` — updating an existing record
 * 6. Prisma transactions — grouping multiple operations atomically
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";
import { FitFeedback } from "@/generated/prisma/enums";

// Define the shape of the request body we expect
interface ReviewInput {
  reviewerName: string;
  rating: number;
  comment: string;
  sizePurchased: string;
  fitFeedback: "Runs Small" | "True to Size" | "Runs Large";
}

// Map the display string to the Prisma enum value
function mapFitFeedback(value: string): FitFeedback {
  switch (value) {
    case "Runs Small": return FitFeedback.Runs_Small;
    case "Runs Large": return FitFeedback.Runs_Large;
    default:           return FitFeedback.True_to_Size;
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await context.params;

    // CONCEPT: request.json() parses the JSON body sent by the frontend.
    // This is equivalent to reading req.body in Express.
    const body: ReviewInput = await request.json();

    // ── INPUT VALIDATION ──────────────────────────────────────────────
    // CONCEPT: Never trust client input. Check that required fields
    // are present and valid before touching the database.
    const { reviewerName, rating, comment, sizePurchased, fitFeedback } = body;

    if (!reviewerName || typeof reviewerName !== "string" || reviewerName.trim().length === 0) {
      return NextResponse.json({ error: "reviewerName is required" }, { status: 400 });
    }
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "rating must be a number between 1 and 5" }, { status: 400 });
    }
    if (!comment || typeof comment !== "string" || comment.trim().length === 0) {
      return NextResponse.json({ error: "comment is required" }, { status: 400 });
    }
    if (!sizePurchased) {
      return NextResponse.json({ error: "sizePurchased is required" }, { status: 400 });
    }

    // Check the product actually exists
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    // ── END VALIDATION ────────────────────────────────────────────────

    // CONCEPT: $transaction ensures both operations (creating review AND
    // updating product rating) happen together. If one fails, neither commits.
    // This prevents a state where a review is saved but the rating isn't updated.
    const [newReview] = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Create the new review record
      const review = await tx.review.create({
        data: {
          productId,
          reviewerName: reviewerName.trim(),
          rating: Math.round(rating), // Ensure it's an integer
          comment: comment.trim(),
          sizePurchased,
          fitFeedback: mapFitFeedback(fitFeedback),
        },
      });

      // 2. Recalculate average rating using SQL AVG aggregation
      // CONCEPT: `aggregate` runs SELECT AVG(rating) FROM reviews WHERE productId = ?
      // This is much more accurate than computing it in JavaScript.
      const avgResult = await tx.review.aggregate({
        where: { productId },
        _avg: { rating: true },
      });

      const newRating = avgResult._avg.rating ?? rating;

      // 3. Update the product's rating field
      await tx.product.update({
        where: { id: productId },
        data: { rating: Math.round(newRating * 10) / 10 }, // Round to 1 decimal
      });

      return [review];
    });

    // Return 201 Created with the new review
    return NextResponse.json(newReview, { status: 201 });

  } catch (error) {
    console.error("[POST /api/products/[id]/reviews] Error:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
