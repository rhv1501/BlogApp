"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center">
      <Image src={assets.logo_light} alt="logo" width={120} />
      <p className="text-sm text-white">
        &copy; {new Date().getFullYear()} Rudresh H Vyas. All rights reserved.
      </p>
      <div className="flex">
        <button
          className="cursor-pointer"
          onClick={() =>
            window.open("https://www.instagram.com/rudresh_vyas_", "_blank")
          }
        >
          <FaInstagram color="white" width={50} />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => window.open("https://github.com/rhv1501", "_blank")}
        >
          <FaGithub color="white" width={50} className="ml-4" />
        </button>
        <button className="cursor-pointer" onClick={() => window.open("https://www.linkedin.com/in/rudresh-h-vyas/", "_blank")}>
          <FaLinkedin color="white" width={50} className="ml-4" />
        </button>
      </div>
    </div>
  );
};

export default Footer;
