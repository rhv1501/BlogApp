"use client";

import BlogtableItem from "@/components/AdminComponents/BlogtableItem";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const page = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blog");
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      setBlogs(data.blogs);
    } catch (err) {
      setError(true);
      toast.error("failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/blog?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
      const data = await response.json();
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      toast.success(data.message);
    } catch (error) {
      toast.error(data.message || "Failed to delete blog");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
    </div>
  ) : (
    <div className="flex-1 pt-5 sm:pt-12 pl-16">
      <h1 className="font-bold text-xl">All Blogs</h1>
      <div className="realticve h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500 ">
          <thead className="text-sm text-gray-700 uppercase text-left bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Author Name
              </th>
              <th scope="col" className="px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className="px-6 py-3">
                Blog Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => {
              return (
                <BlogtableItem
                  key={blog._id}
                  id={blog._id}
                  authorImg={blog.authorImg}
                  title={blog.title}
                  author={blog.author}
                  date={blog.upload_date}
                  handleDelete={handleDelete}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
