import connectDB from "@/lib/config/db";
import { blogModel } from "@/lib/config/models/blogModel";
import { deleteFromBlob, uploadToBlob } from "@/lib/utils/blob";
import { enqueueEmailJob } from "@/lib/utils/Rabbit";
const { NextResponse } = require("next/server");

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const image = formData.get("image");
    let imageUrl = "";
    if (image) {
      imageUrl = await uploadToBlob(image, "blogs");
      if (!imageUrl) {
        return NextResponse.json(
          { success: "false", message: "Failed to upload image" },
          { status: 500 }
        );
      }
    }
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      authorImg: formData.get("authorImg"),
      image: imageUrl,
    };
    const blog=await blogModel.create(blogData);
    enqueueEmailJob(blog);
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
  await connectDB();
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
  await connectDB();
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
    if (!deletedBlog.image) {
      return NextResponse.json(
        { success: "false", message: "error deleting blog" },
        { status: 500 }
      );
    }
    const del = await deleteFromBlob(deletedBlog.image);
    if (!del) {
      return NextResponse.json(
        { success: "false", message: "Failed to delete old image" },
        { status: 500 }
      );
    }
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
  await connectDB();
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
      const imageurl = await uploadToBlob(image, "blogs");
      if (!imageurl) {
        return NextResponse.json(
          { success: "false", message: "Failed to upload image" },
          { status: 500 }
        );
      }
      const del = await deleteFromBlob(blog.image);
      if (!del) {
        return NextResponse.json(
          { success: "false", message: "Failed to delete old image" },
          { status: 500 }
        );
      }
      blogData.image = imageurl;
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
