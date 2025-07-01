import { NextResponse } from "next/server";
import { generateOtp } from "@/lib/utils/otpstore";
import { sendOtpEmail } from "@/lib/utils/mailer";

export async function POST(req) {
  const { email } = await req.json();

  if (email !== process.env.EMAIL)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const otp = await generateOtp(email);
  await sendOtpEmail(email, otp);

  return NextResponse.json(
    { success: true, message: "OTP sent successfully" },
    { status: 200 }
  );
}
