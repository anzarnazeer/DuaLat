import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedPaths = ["/admin", "/api/admin"];
const publicPaths = ["/admin/login", "/api/admin/auth", "/api/auth"];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  if (isProtectedPath && !isPublicPath) {
    const isLoggedIn = !!req.auth;
    const userRole = req.auth?.user?.role;

    if (!isLoggedIn) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    if (userRole !== "ADMIN") {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
      }
      // Redirect customers to home page if they try to access admin
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
