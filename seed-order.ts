import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding test order...");

  const product = await prisma.product.findFirst({
    include: { sizes: true },
  });

  if (!product) {
    console.log("No products found to seed order.");
    return;
  }

  const selectedSize = product.sizes[0]?.size || "Newborn";

  const order = await prisma.order.create({
    data: {
      fullName: "Jane Doe",
      email: "jane@example.com",
      phone: "+1 555-0199",
      addressLine1: "123 Main St",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      country: "USA",
      totalPrice: product.salePrice ?? product.basePrice,
      status: "PENDING",
      items: {
        create: {
          quantity: 1,
          selectedSize: selectedSize,
          priceAtTime: product.salePrice ?? product.basePrice,
          productId: product.id,
        }
      }
    }
  });

  console.log("Order seeded! ID:", order.id);
}

main().finally(() => prisma.$disconnect());
