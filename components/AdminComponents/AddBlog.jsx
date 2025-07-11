"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "highlight.js/styles/github.css";
import Markdown from "@/components/Markdown";

const AddBlog = () => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewMarkdown, setPreviewMarkdown] = useState(false);
  const [showMarkdownHelp, setShowMarkdownHelp] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Consumer Electronics",
    author: "Rudresh H Vyas",
    authorImg: "/author.png",
  });
  const [generating, setGenerating] = useState(false);

  const generate = async () => {
    if (generating) return;

    setGenerating(true);
    toast.loading("Generating blog content, please wait...");
    try {
      const response = await fetch("/api/ai/generateBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: data.description,
        }),
      });
      setData((prev) => ({ ...prev, description: "" }));
      toast.dismiss();
      if (!response.ok) {
        toast.error("Failed to generate blog content");
        return;
      }
      const result = await response.json();
      if (result.success) {
        setData((prev) => ({
          ...prev,
          description: result.content,
        }));
        toast.success("Blog content generated successfully");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to connect to AI service");
    } finally {
      setGenerating(false);
    }
  };

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

  const togglePreview = () => {
    setPreviewMarkdown(!previewMarkdown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image for the blog");
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
      formData.append("image", image);

      const response = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add blog");
      }

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Blog added successfully");
        // Clear form after successful submission
        setData({
          title: "",
          description: "",
          category: "Consumer Electronics",
          author: "",
          authorImg: "",
        });
        setImage(null);
        setPreviewUrl(null);

        // Redirect to blog list after successful submission
        setTimeout(() => router.push("/admin/blogList"), 1500);
      } else {
        toast.error(result.message || "Failed to add blog");
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      toast.error(error.message || "An error occurred while adding the blog");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Add New Blog</h1>

      <form onSubmit={handleSubmit}>
        {/* Image upload section */}
        <div className="mb-6">
          <p className="text-xl mb-2">Blog Thumbnail</p>
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
            Click on the area to select an image
          </p>
        </div>

        {/* Title field */}
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

        {/* Description field with Markdown support */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xl">Blog Description (Markdown)</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowMarkdownHelp(!showMarkdownHelp)}
                className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
              >
                {showMarkdownHelp ? "Hide Help" : "Markdown Tips"}
              </button>
              <button
                type="button"
                onClick={togglePreview}
                className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
              >
                {previewMarkdown ? "Edit" : "Preview"}
              </button>
            </div>
          </div>

          {showMarkdownHelp && (
            <div className="bg-gray-50 p-4 border rounded-md mb-4 ">
              <h4 className="font-medium mb-2">Markdown Cheat Sheet</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Text Formatting</p>
                  <pre className="text-xs bg-gray-100 p-1 rounded">
                    **Bold Text**
                  </pre>
                  <pre className="text-xs bg-gray-100 p-1 rounded">
                    *Italic Text*
                  </pre>
                  <pre className="text-xs bg-gray-100 p-1 rounded">
                    ~~Strikethrough~~
                  </pre>
                </div>
                <div>
                  <p className="font-medium">Headings</p>
                  <pre className="text-xs bg-gray-100 p-1 rounded">
                    # Heading 1
                  </pre>
                  <pre className="text-xs bg-gray-100 p-1 rounded">
                    ## Heading 2
                  </pre>
                  <pre className="text-xs bg-gray-100 p-1 rounded">
                    ### Heading 3
                  </pre>
                </div>
                <div>
                  <p className="font-medium">Links and Images</p>
                  <pre className="text-xs bg-gray-100 p-1 rounded">
                    [Link Text](https://example.com)
                  </pre>
                  <pre className="text-xs bg-gray-100 p-1 rounded">
                    ![Alt text](image-url.jpg)
                  </pre>
                </div>
                <div>
                  <p className="font-medium">Lists</p>
                  <pre className="text-xs bg-gray-100 p-1 rounded">
                    1. Ordered item
                  </pre>
                  <pre className="text-xs bg-gray-100 p-1 rounded">
                    - Unordered item
                  </pre>
                  <pre className="text-xs bg-gray-100 p-1 rounded">
                    - [ ] Task item
                  </pre>
                </div>
                <div>
                  <p className="font-medium">Code Blocks</p>
                  <pre className="text-xs bg-gray-100 p-1 rounded">
                    `inline code`
                  </pre>
                  <pre className="text-xs bg-gray-100 p-1 rounded">
                    ```javascript function hello() &#123; return "world"; &#125;
                    ```
                  </pre>
                </div>
                <div>
                  <p className="font-medium">Blockquotes & Tables</p>
                  <pre className="text-xs bg-gray-100 p-1 rounded">
                    Quoted text
                  </pre>
                  <pre className="text-xs bg-gray-100 p-1 rounded">
                    | Header | Header | | ------ | ------ | | Cell | Cell |
                  </pre>
                </div>
              </div>
            </div>
          )}

          {previewMarkdown ? (
            <div className="border rounded p-4 min-h-[200px] bg-gray-50">
              <Markdown content={data.description} />
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Not Sure of what to write ? explain you idea briefly here
                (atleast 10 characters) or leave it empty the ai will select the
                topic on its own and click generate to let the ai write the blog
                for you.{" "}
                <button
                  type="button"
                  onClick={generate}
                  disabled={
                    generating ||
                    (data.description.trim().length < 10 &&
                      data.description != 0)
                  }
                  className={`font-bold text-md border p-1 rounded-lg transition-colors duration-300 ${
                    generating ||
                    (data.description.trim().length < 10 &&
                      data.description != 0)
                      ? "bg-gray-400 text-gray-600 border-gray-400 cursor-not-allowed"
                      : "bg-black text-white border-black active:text-black active:bg-white hover:bg-gray-800 hover:text-white cursor-pointer"
                  }`}
                >
                  {generating ? "Generating..." : "Generate"}
                </button>
              </p>
              <textarea
                className="w-full px-4 py-3 border rounded font-mono"
                name="description"
                value={data.description}
                onChange={handleChange}
                placeholder="Your description goes here (supports Markdown)"
                rows={6}
                required
              />
            </div>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Supports Markdown: **bold**, *italic*, [links](url), etc.
          </p>
        </div>

        {/* Category selector */}
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
          </select>
        </div>

        {/* Form buttons */}
        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={() => router.push("/admin")}
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
            {submitting ? "Adding..." : "Add Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
