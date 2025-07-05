"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const [email, setEmail] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("email", email);
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        body: formdata,
      });
      const data = await res.json();
      if (data.success === "false") {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      setEmail("");
    } catch (error) {
      toast.error((error.message || "Something went wrong").toString());
      console.error("Error in subscription:", error);
    }
  };
  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex items-center justify-between">
        <Image
          src={assets.logo}
          width={180}
          alt="logo"
          className="w-[130px] sm:w-auto"
        />
        <a
          href="https://www.rhv1501.me"
          target="_blank"
          className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000]"
        >
          Visit author
          <Image src={assets.arrow} alt="an arrow" />
        </a>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blog</h1>
        <p className="mt-10 max-w-[740px]m-auto text-xs sm:text-base text-gray-600">
          From terminal to text — decoding tech with Rudresh.
        </p>
        <form
          onSubmit={handlesubmit}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000]"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Enter Your Email"
            className="pl-4 outline-none"
          />
          <button className="text-xs sm:text-lg border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white cursor-pointer">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
