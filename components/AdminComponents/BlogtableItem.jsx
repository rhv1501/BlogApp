import { assets } from "@/assets/assets";
import Image from "next/image";
import { CiSquareRemove } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";

const BlogtableItem = ({
  id,
  authorImg,
  title,
  author,
  date,
  handleDelete,
}) => {
  const blogdate = new Date(date);

  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          src={authorImg ? authorImg : assets.profile_icon}
          alt="Author"
          className="rounded-full"
          width={40}
          height={40}
        />
        <p>{author ? author : "no author"}</p>
      </th>
      <td className="px-6 py-4">{title ? title : "No Blog Title"}</td>
      <td className="px-6 py-4">
        {blogdate ? blogdate.toDateString() : "Date not available"}
      </td>
      <td className="px-6 py-4 cursor-pointer flex gap-1 items-center justify-center">
        <CiSquareRemove
          size={30}
          color="black"
          onClick={() => handleDelete(id)}
        />
        <Link href={`/admin/update?id=${id}`}>
          <FaRegEdit size={30} color="black" />
        </Link>
      </td>
    </tr>
  );
};

export default BlogtableItem;
