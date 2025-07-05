import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import "highlight.js/styles/github.css";
import { getExcerpt } from "@/lib/utils/getExcerpt";
const Blogitem = ({ title, description, category, image, id }) => {
  return (
    <div className="max-w-[330px] sm:max-w-[300px] rounded-md bg-white border border-black hover:shadow-[-7px_7px_0px_#000] transition-shadow duration-500 ease-in-out overflow-x-auto">
      <Link href={`blogs/${id}`}>
        <Image
          src={image}
          alt="featured image"
          width={400}
          height={400}
          className="border-b border-black p-1"
          priority
        />
      </Link>

      <p className="ml-5 mt-5 p-1 inline-block bg-black text-white text-sm rounded-md">
        {category}
      </p>
      <div className="p-5">
        <h5 className="mb-2 text-l font-medium tracking-tight text-gray-900 ">
          {title}
        </h5>
        <p className="text-gray-700 text-sm mb-4">
          {getExcerpt(description, 150)}
        </p>
        <Link href={`blogs/${id}`}>
          <div className="inline-flex items-center py-2 font-semibold text-center">
            Read More
            <Image src={assets.arrow} alt="arrow" width={12} className="ml-2" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Blogitem;
