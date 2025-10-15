"use client";

import Emailitems from "@/components/AdminComponents/Emailitems";
import { useEffect, useState } from "react";

const page = () => {
  const [emails, setEmails] = useState([]);
  const fetchEmails = async () => {
    try {
      const response = await fetch("/api/email", {
        method: "GET",
        headers: { token: localStorage.getItem("token") || "" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }
      const data = await response.json();
      setEmails(data.emails);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };
  useEffect(() => {
    fetchEmails();
  }, []);
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Subscription</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 upercase bg-gray-50">
            <tr>
              <th className="px-6 py-3" scope="col">
                Email Subscription
              </th>
              <th className="px-6 py-3 hidden sm:block" scope="col">
                Date
              </th>
              <th className="px-6 py-3" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((data) => {
              console.log(data);
              return (
                <Emailitems
                  key={data._id}
                  email={data.email}
                  date={data.Date}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
