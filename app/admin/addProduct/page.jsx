"use client";

import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [image, setimage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Consumer Electronics",
    author: "Rudresh H Vyas",
    authorImg: "/author.png",
  });
  const onChangehd = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onSubmithd = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    formdata.append("category", data.category);
    formdata.append("author", data.author);
    formdata.append("authorImg", data.authorImg);
    formdata.append("image", image);
    const res = await axios.post("/api/blog", formdata);
    if (res.data.success) {
      toast.success(res.data.message);
      setimage(false);
      setData({
        title: "",
        description: "",
        category: "Consumer Electronics",
      });
    } else {
      toast.error(res.data.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmithd} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl ">Upload thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-4 cursor-pointer"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt="upload image"
          />
        </label>
        <input
          onChange={(e) => {
            setimage(e.target.files[0]);
          }}
          type="file"
          name="image"
          id="image"
          hidden
          required
        />
        <p className="text-xl mt-4">Blog Title</p>
        <input
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border "
          type="text"
          name="title"
          id="title"
          onChange={onChangehd}
          value={data.title}
          placeholder="Your title goes here"
        />
        <p className="text-xl mt-4">Blog Decription</p>
        <textarea
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border "
          type="text"
          name="description"
          onChange={onChangehd}
          value={data.description}
          id="Decription"
          placeholder="Your Decription goes here"
          rows={6}
        />
        <p className="text-xl mt-4">Blog Category</p>
        <select
          name="category"
          onChange={onChangehd}
          value={data.category}
          className="w-auto mt-4 px-4 py-3 border text-gray-500"
        >
          <option value="Consumer Electronics">Consumer Electronics</option>
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Development">Development</option>
          <option value="Devops">Devops</option>
          <option value="Design">Design</option>
        </select>
        <br />
        <button
          type="submit"
          className="mt-8 w-40 h-12 bg-black text-white rounded-md"
        >
          Post
        </button>
      </form>
    </>
  );
};

export default page;
