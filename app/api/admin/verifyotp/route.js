import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/utils/otpstore";
import { signToken } from "@/lib/utils/jwt";
import { serialize } from "cookie";

export async function POST(req) {
  const { email, otp } = await req.json();

  if (email !== process.env.EMAIL || !verifyOtp(email, otp)) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
  }

  const token = await signToken(email);

  return new NextResponse(JSON.stringify({ success: true }), {
    headers: {
      "Set-Cookie": serialize("token", token, {
        httpOnly: true,
        maxAge: 3600,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      }),
    },
  });
}
