import { CiSquareRemove } from "react-icons/ci";

const Emailitems = ({ email, date }) => {
  const Datec = new Date(date);
  return (
    <tr className="bg-white border-b text-left">
      <th
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        scope="row"
      >
        {email ? email : "No Email Provided"}
      </th>
      <td className="px-6 py-4 hidden sm:block">{Datec.toDateString()}</td>
      <td className="px-6 py-4">
        <CiSquareRemove
          size={30}
          color="black"
          onClick={() => handleDelete("id")}
        />
      </td>
    </tr>
  );
};

export default Emailitems;
