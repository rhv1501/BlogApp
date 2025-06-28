"use client";
import { assets } from "@/assets/assets";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import { toast } from "react-toastify";
import Markdown from "@/components/Markdown";
const Page = ({ params }) => {
  const { id } = use(params);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blog?id=${id}`);
      const result = await response.json();

      if (result.success === "true" && result.blog) {
        setData(result.blog);
      } else {
        setError(true);
        toast.error(result.message || "Blog not found");
        console.error("Error fetching blog data:", result.message);
      }
    } catch (error) {
      setError(true);
      toast.error("An error occurred while fetching blog data");
      console.error("Error fetching blog data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading blog...</p>
      </div>
    );
  }

  // Error state - Blog not found
  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <Image
          src={assets.logo}
          width={180}
          height={60}
          alt="logo"
          className="mb-8"
        />
        <h1 className="text-3xl font-bold mb-4">Blog Not Available</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          Sorry, the blog post you're looking for couldn't be found or may have
          been removed.
        </p>
        <Link
          href="/"
          className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Blog post found - render normal content
  return (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
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
            src={data.authorImg}
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
          className="border-4 border-white"
        />
        <h1 className="my-8 text-[26px] font-semibold">Introduction</h1>

        <Markdown content={data.description} />

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
        <h3 className="my-5 txt-[17px] font-semibold animate-pulse">
          Want the latest tech buzz delivered straight to your inbox?
        </h3>
        <p className="my-3">
          From breakthrough AI and jaw-dropping consumer tech to code that
          actually works (we promise 😅) — we cover it all. Just head to the
          homepage, drop your email, and hit Subscribe. No spam. Just signal.
          The future of tech, delivered straight to your inbox.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Page;
