import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/utils/jwt";

export async function middleware(req) {
  const token = await req.cookies.get("token")?.value;

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      console.log("token not found");
      return NextResponse.redirect(new URL("/login/admin", req.url));
    }
    try {
      console.log(token);
      await verifyToken(token);
      console.log("verified");
      return NextResponse.next();
    } catch {
      console.log("token verification failed");
      return NextResponse.redirect(new URL("/login/admin", req.url));
    }
  }

  // Protect API write operations (POST, PUT, DELETE) for blog routes
  if (req.nextUrl.pathname.startsWith("/api/blog")) {
    console.log("Blog API Request:", req.method, req.nextUrl.pathname);

    // Allow GET requests to pass through
    if (req.method === "GET") {
      console.log("GET request allowed without authentication");
      return NextResponse.next();
    }

    // For POST, PUT, DELETE requests, verify authentication
    if (!token) {
      console.log("API access denied: No token");
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    try {
      await verifyToken(token);
      console.log(
        "API access granted: Token verified for",
        req.method,
        "request"
      );
      return NextResponse.next();
    } catch (error) {
      console.log("API access denied: Invalid token");
      return NextResponse.json(
        { success: false, message: "Invalid authentication" },
        { status: 403 }
      );
    }
  }

  // Protect email list access (GET /api/email)
  if (req.nextUrl.pathname === "/api/email" && req.method === "GET") {
    console.log("Email List API Request: Restricted endpoint");

    // Require authentication for getting email list
    if (!token) {
      console.log("Email List access denied: No token");
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    try {
      await verifyToken(token);
      console.log("Email List access granted: Token verified");
      return NextResponse.next();
    } catch (error) {
      console.log("Email List access denied: Invalid token");
      return NextResponse.json(
        { success: false, message: "Invalid authentication" },
        { status: 403 }
      );
    }
  }

  // Protect AI blog generation API
  if (req.nextUrl.pathname === "/api/ai/generateBlog") {
    console.log("AI Blog Generation API Request");

    // Require authentication for generating AI blog content
    if (!token) {
      console.log("AI Blog Generation access denied: No token");
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    try {
      await verifyToken(token);
      console.log("AI Blog Generation access granted: Token verified");
      return NextResponse.next();
    } catch (error) {
      console.log("AI Blog Generation access denied: Invalid token");
      return NextResponse.json(
        { success: false, message: "Invalid authentication" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
} // Define which routes this middleware should run for
export const config = {
  matcher: [
    // Match all routes under /admin
    "/admin/:path*",
    // Match all routes under /api/blog
    "/api/blog/:path*",
    // Match email API route
    "/api/email",
    // Match AI blog generation API
    "/api/ai/generateBlog",
  ],
};
