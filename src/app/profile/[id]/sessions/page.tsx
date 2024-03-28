import { useEffect, useState } from "react";
import { sessionItems } from "../../../../../constants";
import Link from "next/link";

export default function UserSessions() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 my-10">
      <div className="items-start justify-between md:flex">
        <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white">
          All Sessions
        </h1>
        <div className="mt-3 md:mt-0 flex justify-center">
          <Link
            href="/createsession"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Create Session
          </Link>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6 flex items-center gap-x-4">Sr. no.</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Giver&apos;s Email</th>
              <th className="py-3 px-6">Receiver&apos;s Email</th>
              <th className="py-3 px-6">Company</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {sessionItems.map((item, idx) => (
              <tr key={idx} className="odd:bg-gray-50 even:bg-white">
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-4">
                  {idx + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.giversemail}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.receiversemail}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.company}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-2 rounded-full font-semibold text-xs ${
                      item.status == "Active"
                        ? "text-green-600 bg-green-50"
                        : "text-blue-600 bg-blue-50"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="text-right px-6 whitespace-nowrap">
                  <Link
                    href={`/session/${2}/${"giver"}`}
                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
