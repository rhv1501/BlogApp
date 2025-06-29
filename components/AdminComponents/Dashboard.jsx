"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    categories: {},
    recentBlogs: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/blog");
        const result = await response.json();

        if (result.success === "true") {
          const blogs = result.blogs;

          // Count blogs by category
          const categoryCount = {};
          blogs.forEach((blog) => {
            categoryCount[blog.category] =
              (categoryCount[blog.category] || 0) + 1;
          });

          // Get recent blogs (last 5)
          const recentBlogs = blogs
            .sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date))
            .slice(0, 5);

          setStats({
            totalBlogs: blogs.length,
            categories: categoryCount,
            recentBlogs,
          });
        } else {
          toast.error("Failed to fetch dashboard data");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("An error occurred while fetching dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8 gap-3">
        <h1 className="text-lg md:text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Link
            href="/admin/addProduct"
            className="px-2 py-1 md:px-4 md:py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-xs md:text-md"
          >
            Add New Blog
          </Link>
          <Link
            href="/admin/blogList"
            className="px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-xs md:text-md"
          >
            Manage Blogs
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Total Blogs</h2>
          <p className="text-4xl font-bold">{stats.totalBlogs}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <p className="text-4xl font-bold">
            {Object.keys(stats.categories).length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Last Updated</h2>
          <p className="text-lg font-medium">
            {stats.recentBlogs.length > 0
              ? new Date(stats.recentBlogs[0].upload_date).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }
                )
              : "No blogs yet"}
          </p>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Blog Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(stats.categories).map(([category, count]) => (
            <div key={category} className="border border-gray-200 rounded p-3">
              <p className="text-sm text-gray-600">{category}</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-sm text-gray-500">
                  {((count / stats.totalBlogs) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="w-full bg-gray-200 h-2 mt-2 rounded-full">
                <div
                  className="bg-black h-2 rounded-full"
                  style={{ width: `${(count / stats.totalBlogs) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Blogs */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Blogs</h2>
          <Link
            href="/admin/blogList"
            className="text-sm text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="divide-y">
          {stats.recentBlogs.length === 0 ? (
            <p className="py-4 text-gray-500">
              No blogs have been created yet.
            </p>
          ) : (
            stats.recentBlogs.map((blog) => (
              <div key={blog._id} className="py-4 flex items-start gap-4">
                <div className="w-16 h-16 flex-shrink-0">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{blog.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(blog.upload_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Link
                      href={`/blogs/${blog._id}`}
                      target="_blank"
                      className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/update?id=${blog._id}`}
                      className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-xs rounded">
                    {blog.category}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-medium mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/addProduct"
            className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded hover:shadow-md transition-shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span>New Blog</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded hover:shadow-md transition-shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>View Site</span>
          </Link>
          <Link
            href="/admin/blogList"
            className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded hover:shadow-md transition-shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span>All Blogs</span>
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded hover:shadow-md transition-shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
