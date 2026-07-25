import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: "admin@dualat.com" },
    });

    if (!user) {
      return NextResponse.json({ status: "User not found" });
    }

    return NextResponse.json({
      status: "User found",
      email: user.email,
      role: user.role,
      hasPassword: !!user.password,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "Database error",
      error: error.message,
    }, { status: 500 });
  }
}
