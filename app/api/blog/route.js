import connectDB from "@/lib/config/db";
import { blogModel } from "@/lib/config/models/blogModel";
import { writeFile } from "fs/promises";

const { NextResponse } = require("next/server");

const laodDb = async () => {
  await connectDB();
};
laodDb();

export async function GET(request) {
  return NextResponse.json(
    { message: "Hello from the blog API!" },
    { status: 200 }
  );
}

export async function POST(request) {
  const formData = await request.formData();
  const timeStamp = Date.now();
  const image = formData.get("image");
  const imageByte = await image.arrayBuffer();
  const imageBuffer = Buffer.from(imageByte);
  const path = `./public/${timeStamp}_${image.name}`;
  await writeFile(path, imageBuffer);
  const imageUrl = `/${timeStamp}_${image.name}`;
  const blogData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    author: formData.get("author"),
    authorImg: formData.get("authorImg"),
    image: imageUrl,
  };
  await blogModel.create(blogData);
  console.log("blogData", blogData);
  return NextResponse.json(
    { success: "true", message: "Blog Added successfully" },
    { status: 200 }
  );
}
