import connectDB from "@/lib/config/db";
import { blogModel } from "@/lib/config/models/blogModel";
import { writeFile } from "fs/promises";
const fs = require("fs");
const { NextResponse } = require("next/server");

const laodDb = async () => {
  await connectDB();
};
laodDb();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const timeStamp = Date.now();
    const image = formData.get("image");
    const imageByte = await image.arrayBuffer();
    const imageBuffer = Buffer.from(imageByte);
    const path = `./public/uploads/blogs/${timeStamp}_${image.name}`;
    await writeFile(path, imageBuffer);
    const imageUrl = `/uploads/blogs/${timeStamp}_${image.name}`;
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
  } catch (error) {
    return NextResponse.json(
      { success: "false", message: "Failed to add blog", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    console.log(blogId);
    try {
      const blog = await blogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json(
          { success: "false", message: "Blog not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: "true", message: "Blog fetched successfully", blog },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        {
          success: "false",
          message: "Failed to fetch blog",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }
  try {
    const blogs = await blogModel.find().sort("upload_date");
    return NextResponse.json(
      { success: "true", message: "Blogs fetched successfully", blogs },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: "false",
        message: "Failed to fetch blogs",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (!blogId) {
    return NextResponse.json(
      { success: "false", message: "Blog ID is required" },
      { status: 400 }
    );
  }
  try {
    const deletedBlog = await blogModel.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return NextResponse.json(
        { success: "false", message: "Blog not found" },
        { status: 404 }
      );
    }
    fs.unlink(`./public${deletedBlog.image}`, (err) => {
      if (err) {
        return NextResponse.json(
          {
            success: "false",
            message: "failed to delete  image from server",
            error: err.message,
          },
          { status: 500 }
        );
      }
    });
    return NextResponse.json(
      { success: "true", message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: "false",
        message: "Failed to delete blog",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const formData = await request.formData();
  const blogId = request.nextUrl.searchParams.get("id");
  if (!blogId) {
    return NextResponse.json(
      { success: "false", message: "Blog ID is required" },
      { status: 400 }
    );
  }
  try {
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
    };
    const image = formData.get("image");
    if (image) {
      const blog = await blogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json(
          { success: "false", message: "Blog not found" },
          { status: 404 }
        );
      }
      fs.unlink(`./public${blog.image}`, (err) => {
        if (err) {
          return NextResponse.json(
            {
              success: "false",
              message: "failed to delete  image from server",
              error: err.message,
            },
            { status: 500 }
          );
        }
      });
      const timeStamp = Date.now();
      const imageByte = await image.arrayBuffer();
      const imageBuffer = Buffer.from(imageByte);
      const path = `./public/uploads/blogs/${timeStamp}_${image.name}`;
      await writeFile(path, imageBuffer);
      blogData.image = `/uploads/blogs/${timeStamp}_${image.name}`;
    }
    const updatedBlog = await blogModel.findByIdAndUpdate(blogId, blogData, {
      new: true,
    });
    if (!updatedBlog) {
      return NextResponse.json(
        { success: "false", message: "Blog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: "true",
        message: "Blog updated successfully",
        blog: updatedBlog,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: "false",
        message: "Failed to update blog",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
