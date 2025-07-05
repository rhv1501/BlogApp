import connectDB from "@/lib/config/db";
import EmailModel from "@/lib/config/models/EmailModel";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
  await connectDB();
    const formData = await request.formData();
    const emailData = {
      email: `${formData.get("email")}`,
    };
    const check = await EmailModel.findOne({ email: emailData.email });
    if (check) {
      return NextResponse.json(
        { success: "false", message: "Email already subscribed" },
        { status: 400 }
      );
    }
    const email = await EmailModel.create(emailData);
    await email.save();
    return NextResponse.json(
      { success: "true", message: "Subscribed successfully", email },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: "false",
        message: "Failed to subscribe email",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  await connectDB();
  try {
    const emails = await EmailModel.find({});
    return NextResponse.json(
      { success: "true", message: "Emails fetched successfully", emails },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json(
      {
        success: "false",
        message: "Failed to fetch emails",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
