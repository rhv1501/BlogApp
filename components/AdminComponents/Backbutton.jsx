"use client";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Backbutton = () => {
  const pathname = usePathname();
  return pathname !== "/admin" ? (
    <Link href="/admin" className="md:hidden">
      <IoMdArrowRoundBack className="cursor-pointer" size={30} />
    </Link>
  ) : null;
};
export default Backbutton;
