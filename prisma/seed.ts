/**
 * prisma/seed.ts
 * Run with: npx tsx prisma/seed.ts
 */

import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { MOCK_PRODUCTS } from "../src/lib/mockData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear all existing data without a transaction (avoids timeout over cloud connections)
  console.log("🗑️  Clearing existing data...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.sizeStock.deleteMany();
  await prisma.product.deleteMany();

  console.log(`📦 Seeding ${MOCK_PRODUCTS.length} products...`);

  for (const mockProduct of MOCK_PRODUCTS) {
    await prisma.product.create({
      data: {
        id: mockProduct.id,
        name: mockProduct.name,
        description: mockProduct.description,
        basePrice: mockProduct.basePrice,
        salePrice: mockProduct.salePrice ?? null,
        category: mockProduct.category,
        collection: mockProduct.collection,
        images: mockProduct.images,
        fabricTags: mockProduct.fabricTags,
        fabricDetails: mockProduct.fabricDetails,
        careInstructions: mockProduct.careInstructions,
        rating: mockProduct.rating,
        sizes: {
          createMany: {
            data: mockProduct.sizes.map((s) => ({
              size: s.size,
              stockCount: s.stockCount,
              weightRange: s.weightRange,
              heightRange: s.heightRange,
            })),
          },
        },
        reviews: {
          createMany: {
            data: mockProduct.reviews.map((r) => ({
              reviewerName: r.reviewerName,
              rating: r.rating,
              comment: r.comment,
              sizePurchased: r.sizePurchased,
              fitFeedback:
                r.fitFeedback === "Runs Small"
                  ? "Runs_Small"
                  : r.fitFeedback === "Runs Large"
                  ? "Runs_Large"
                  : "True_to_Size",
            })),
          },
        },
      },
    });
    console.log(`   ✅ ${mockProduct.name}`);
  }

  const productCount = await prisma.product.count();
  const reviewCount  = await prisma.review.count();
  const sizeCount    = await prisma.sizeStock.count();

  console.log("\n🎉 Seed complete!");
  console.log(`📊 Products: ${productCount} | Sizes: ${sizeCount} | Reviews: ${reviewCount}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
