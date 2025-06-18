"use client";
import { assets, blog_data } from "@/assets/assets";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, use } from "react";

const page = ({ params }) => {
  const { id } = use(params);
  const [data, setData] = useState(null);
  const fetchBlogData = async () => {
    for (let i = 0; i < blog_data.length; i++) {
      if (Number(id) == blog_data[i].id) {
        setData(blog_data[i]);
        console.log(blog_data[i]);
        break;
      }
    }
  };
  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);
  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28 ">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <Image
              src={assets.logo}
              width={180}
              alt="logo"
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000]">
            Get Started <Image src={assets.arrow} alt="an arrow" />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            src={data.author_img}
            width={60}
            height={60}
            alt="author image"
            className="mx-auto mt-6 border border-white rounded-full"
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>

      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          src={data.image}
          width={1280}
          height={720}
          alt="featured image"
          className="border-4 border-white "
        ></Image>
        <h1 className="my-8 text-[26px] font-semibold">Introduction</h1>
        <p>{data.description}</p>
        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} alt="social logo" />
            <Image src={assets.twitter_icon} alt="social logo" />
            <Image src={assets.googleplus_icon} alt="social logo" />
          </div>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-10 mb-20 bg-gray-200 px-5 py-2 rounded-2xl">
        <h3 className="my-5 txt-[17px] font-semibold animate-pulse ">
          Want the latest tech buzz delivered straight to your inbox?
        </h3>
        <p className="my-3 ">
          From breakthrough AI and jaw-dropping consumer tech to code that
          actually works (we promise 😅) — we cover it all. Just head to the
          homepage, drop your email, and hit Subscribe. No spam. Just signal.
          The future of tech, delivered straight to your inbox.
        </p>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default page;
