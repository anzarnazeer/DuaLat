import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@dualat.com";
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.log("User not found!");
    return;
  }
  
  console.log("Found user:", user.email, "Role:", user.role);
  
  const pwToTest = "admin";
  const isValid = await bcrypt.compare(pwToTest, user.password || "");
  console.log("Is 'admin' the correct password?", isValid);

  // Check if it was saved with quotes
  const isQuotedValid = await bcrypt.compare('"admin"', user.password || "");
  console.log("Is '\"admin\"' the correct password?", isQuotedValid);
}

main().finally(() => prisma.$disconnect());
