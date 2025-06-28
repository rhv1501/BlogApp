import { blog_data } from "@/assets/assets";
import React, { useEffect, useState } from "react";
import Blogitem from "./Blogitem";
import { toast } from "react-toastify";

const Bloglist = () => {
  const [Blogs, setBlogs] = useState([]);

  const fetchblogs = async () => {
    try {
      const response = await fetch("/api/blog");
      if (!response.ok) {
        toast.error(res.data.message);
        return;
      }
      toast.success("Blogs fetched successfully");
      const data = await response.json();
      setBlogs(data.blogs);
    } catch (error) {
      toast.error("Failed to fetch blogs");
      console.error("Error fetching blogs:", error);
    }
  };
  useEffect(() => {
    fetchblogs();
  }, []);
  const [menu, setMenu] = useState("All");
  return (
    <div>
      <div className="flex justify-center gap-6 my-10 flex-wrap">
        <button
          onClick={() => {
            setMenu("All");
          }}
          className={`${
            menu === "All" ? "bg-black text-white py-1 px-4 roounded-sm" : null
          } cursor-pointer`}
        >
          All
        </button>
        <button
          onClick={() => {
            setMenu("Consumer Electronics");
          }}
          className={`${
            menu === "Consumer Electronics"
              ? "bg-black text-white py-1 px-4 roounded-sm"
              : null
          } cursor-pointer`}
        >
          Consumer Electronics
        </button>
        <button
          onClick={() => {
            setMenu("Startup");
          }}
          className={`${
            menu === "Startup"
              ? "bg-black text-white py-1 px-4 roounded-sm"
              : null
          } cursor-pointer`}
        >
          Startup
        </button>
        <button
          onClick={() => {
            setMenu("Technology");
          }}
          className={`${
            menu === "Technology"
              ? "bg-black text-white py-1 px-4 roounded-sm"
              : null
          } cursor-pointer`}
        >
          Technology
        </button>
        <button
          onClick={() => {
            setMenu("Development");
          }}
          className={`${
            menu === "Development"
              ? "bg-black text-white py-1 px-4 roounded-sm"
              : null
          } cursor-pointer`}
        >
          Development
        </button>
        <button
          onClick={() => {
            setMenu("Devops");
          }}
          className={`${
            menu === "Devops"
              ? "bg-black text-white py-1 px-4 roounded-sm"
              : null
          } cursor-pointer`}
        >
          Devops
        </button>
        <button
          onClick={() => {
            setMenu("AI");
          }}
          className={`${
            menu === "AI" ? "bg-black text-white py-1 px-4 roounded-sm" : null
          } cursor-pointer`}
        >
          AI
        </button>
        <button
          onClick={() => {
            setMenu("Design");
          }}
          className={`${
            menu === "Design"
              ? "bg-black text-white py-1 px-4 roounded-sm"
              : null
          } cursor-pointer`}
        >
          Design
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {Blogs
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item) => {
            return (
              <Blogitem
                key={item._id}
                title={item.title}
                description={item.description}
                category={item.category}
                image={item.image}
                id={item._id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Bloglist;
