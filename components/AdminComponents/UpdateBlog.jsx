"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { assets } from "@/assets/assets";
import "highlight.js/styles/github.css";
import Markdown from "@/components/Markdown";

const UpdateBlog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewMarkdown, setPreviewMarkdown] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Consumer Electronics",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        toast.error("Blog ID not found. Redirecting to blog list...");
        setTimeout(() => router.push("/admin/blogList"), 2000);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/blog?id=${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }

        const result = await response.json();

        if (result.success === "true" && result.blog) {
          const blog = result.blog;
          setData({
            title: blog.title || "",
            description: blog.description || "",
            category: blog.category || "Consumer Electronics",
          });

          setPreviewUrl(blog.image);
        } else {
          toast.error(result.message || "Blog not found");
          setTimeout(() => router.push("/admin/blogList"), 2000);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to fetch blog data");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, router]);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Toggle markdown preview
  const togglePreview = () => {
    setPreviewMarkdown(!previewMarkdown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      toast.error("Blog ID is missing");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("authorImg", data.authorImg);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`/api/blog?id=${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      const result = await response.json();

      if (result.success === "true") {
        toast.success(result.message || "Blog updated successfully");
        // Redirect back to the blog list after successful update
        setTimeout(() => router.push("/admin/blogList"), 1500);
      } else {
        toast.error(result.message || "Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(error.message || "An error occurred while updating the blog");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Update Blog</h1>

      <form onSubmit={handleSubmit}>
        {/* Image section stays the same */}
        <div className="mb-6">
          <p className="text-xl mb-2">Update Thumbnail</p>
          <label htmlFor="image" className="cursor-pointer block">
            <Image
              src={previewUrl || assets.upload_area}
              width={300}
              height={180}
              alt="thumbnail"
              className="border rounded object-cover"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            name="image"
            id="image"
            accept="image/*"
            hidden
          />
          <p className="text-sm text-gray-500 mt-1">
            Click on the image to update the thumbnail
          </p>
        </div>

        {/* Title field stays the same */}
        <div className="mb-4">
          <label className="block text-xl mb-2">Blog Title</label>
          <input
            className="w-full px-4 py-3 border rounded"
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="Your title goes here"
            required
          />
        </div>

        {/* Modified description field with Markdown support */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xl">Blog Description (Markdown)</label>
            <button
              type="button"
              onClick={togglePreview}
              className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
            >
              {previewMarkdown ? "Edit" : "Preview"}
            </button>
          </div>

          {previewMarkdown ? (
            <div className="border rounded p-4 min-h-[200px] bg-gray-50">
              <Markdown content={data.description} />
            </div>
          ) : (
            <textarea
              className="w-full px-4 py-3 border rounded font-mono"
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Your description goes here (supports Markdown)"
              rows={6}
              required
            />
          )}
          <p className="text-sm text-gray-500 mt-1">
            Supports Markdown: **bold**, *italic*, [links](url), etc.
          </p>
        </div>

        {/* Category selector stays the same */}
        <div className="mb-4">
          <label className="block text-xl mb-2">Blog Category</label>
          <select
            name="category"
            value={data.category}
            onChange={handleChange}
            className="w-auto px-4 py-3 border rounded text-gray-700"
          >
            <option value="Consumer Electronics">Consumer Electronics</option>
            <option value="Startup">Startup</option>
            <option value="Technology">Technology</option>
            <option value="Development">Development</option>
            <option value="Devops">Devops</option>
            <option value="Design">Design</option>
            <option value="LifeStyle">LifeStyle</option>
          </select>
        </div>

        {/* Buttons stay the same */}
        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={() => router.push("/admin/blogList")}
            className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className={`px-6 py-3 rounded-md text-white transition-colors ease-in-out duration-500 ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800 hover:animate-pulse"
            }`}
          >
            {submitting ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
