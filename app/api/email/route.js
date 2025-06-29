import connectDB from "@/lib/config/db";
import EmailModel from "@/lib/config/models/EmailModel";
import { NextResponse } from "next/server";

const loadDb = async () => {
  await connectDB();
};
loadDb();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const emailData = {
      email: `${formData.get("email")}`,
    };
    const email = await EmailModel.create(emailData);
    return new NextResponse.json(
      { message: "Subscribed successfully", email },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error subscribing email:", error);
    return new NextResponse.json(
      { message: "Failed to subscribe email", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const emails = await EmailModel.find({});
    return new NextResponse.json(
      { message: "Emails fetched successfully", emails },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching emails:", error);
    return new NextResponse.json(
      { message: "Failed to fetch emails", error: error.message },
      { status: 500 }
    );
  }
}
