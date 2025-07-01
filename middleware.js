import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/utils/jwt";

export async function middleware(req) {
  const token = await req.cookies.get("token")?.value;

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

  return NextResponse.next();
}
