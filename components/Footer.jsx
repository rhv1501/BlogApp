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
        <FaInstagram color="white" width={50} />
        <FaGithub color="white" width={50} className="ml-4" />
        <FaLinkedin color="white" width={50} className="ml-4" />
      </div>
    </div>
  );
};

export default Footer;
