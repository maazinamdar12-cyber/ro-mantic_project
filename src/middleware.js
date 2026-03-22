import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public auth pages
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  /* ================= ADMIN ROUTES ================= */
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const decoded = jwt.decode(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  /* ================= USER-PROTECTED ROUTES ================= */
  const protectedUserRoutes = [
    "/orders",
    "/checkout",
    "/services/book",
    "/services/my-bookings",
    
  ];

  if (protectedUserRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // no verification here
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/orders",
    "/checkout",
    "/services/book/:path*",
  ],
};
