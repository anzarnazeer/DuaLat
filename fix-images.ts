import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

const brokenImages = [
  "https://images.unsplash.com/photo-1604073536770-8a33e332f877?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1544123089-c8d7bd6d8338?auto=format&fit=crop&q=80&w=600"
];

const fallbackImages = [
  "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600", // Toddler clothes
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600"  // Baby room
];

async function main() {
  console.log("Fixing broken image URLs in the database...");
  
  const products = await prisma.product.findMany();
  
  for (const product of products) {
    let changed = false;
    const newImages = product.images.map((img, index) => {
      if (brokenImages.includes(img)) {
        changed = true;
        return fallbackImages[index % fallbackImages.length];
      }
      return img;
    });

    if (changed) {
      await prisma.product.update({
        where: { id: product.id },
        data: { images: newImages }
      });
      console.log(`Updated images for product: ${product.name}`);
    }
  }
  
  console.log("Database image fix complete!");
}

main().finally(() => prisma.$disconnect());
