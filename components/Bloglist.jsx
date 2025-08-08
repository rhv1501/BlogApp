"use client";
import React, { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Bloglist = () => {
  const Blogitem = React.lazy(() => import("@/components/Blogitem"));
  const [Blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState("All");

  const fetchblogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/blog");
      if (!response.ok) {
        toast.error("Failed to fetch blogs");
        return;
      }
      const data = await response.json();
      setBlogs(data.blogs);
      toast.success("Blogs fetched successfully");
    } catch (error) {
      toast.error("Failed to fetch blogs");
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchblogs();
  }, []);

  const categories = [
    "All",
    "Consumer Electronics",
    "Startup",
    "Technology",
    "Development",
    "Devops",
    "Ai",
    "Design",
    "LifeStyle",
  ];

  if (loading) {
    return (
      <div>
        <div className="flex justify-center gap-6 my-10 flex-wrap">
          {categories.map((category) => (
            <div
              key={category}
              className="animate-pulse bg-gray-300 h-8 px-4 py-1 rounded-sm"
              style={{ width: `${category.length * 8 + 32}px` }}
            ></div>
          ))}
        </div>

        <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
          {[...Array(6)].map((_, i) => (
            <BlogitemSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center gap-6 my-10 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setMenu(category)}
            className={`${
              menu === category
                ? "bg-black text-white py-1 px-4 rounded-sm"
                : ""
            } cursor-pointer hover:bg-gray-200 transition-colors py-1 px-4 rounded-sm`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {Blogs.filter((item) =>
          menu === "All" ? true : item.category === menu
        ).map((item) => (
          <Suspense fallback={<BlogitemSkeleton />} key={item._id}>
            <Blogitem
              title={item.title}
              description={item.description}
              category={item.category}
              image={item.image}
              id={item._id}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default Bloglist;

const BlogitemSkeleton = () => {
  return (
    <div className="w-[330px] sm:w-[300px] max-w-[330px] sm:max-w-[300px] rounded-md bg-white border border-black hover:shadow-[-7px_7px_0px_#000] transition-shadow duration-500 ease-in-out overflow-x-auto animate-pulse">
      <div className="border-b border-black p-1">
        <div className="w-full h-[200px] bg-gray-300 rounded"></div>
      </div>

      <div className="ml-5 mt-5 mb-2">
        <div className="w-20 h-6 bg-gray-300 rounded-md inline-block"></div>
      </div>

      <div className="p-5">
        <div className="mb-2">
          <div className="h-5 bg-gray-300 rounded w-full mb-1"></div>
          <div className="h-5 bg-gray-300 rounded w-3/4"></div>
        </div>

        <div className="mb-4">
          <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>

        <div className="inline-flex items-center py-2">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="w-3 h-3 bg-gray-300 rounded ml-2"></div>
        </div>
      </div>
    </div>
  );
};
