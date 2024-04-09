"use client"

import { useEffect, useState, useContext } from "react";
import { sessionItems } from "../../../../../constants";
import Link from "next/link";
import UserContext from "@/contexts/UserContext";

export default function UserSessions() {

  const { user } = useContext(UserContext);

  const [loading,setLoading] = useState(false);

  const [sessions,setSessions] = useState<any>();



  useEffect(()=>{

    setLoading(true)

    fetch(`${process.env.GOOGLE_SHEETS_URL}?route=getSessionsOfUser&email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setSessions([
            ...data?.giverSessions,
            ...data?.receiverSessions
          ].sort((a, b) => {
            let dateA = new Date(a.date), dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
        }))
          // console.log(data)
          setLoading(false)
        })

  },[])


  // console.log(sessions)


  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
}




  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 my-10 min-h-[600px]">
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
            {sessions?.map((item:any, idx:any) => (
              <tr key={idx} className="odd:bg-gray-50 even:bg-white">
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-4">
                  {idx + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(item?.date)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item?.giverUserEmail}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item?.receiverUserEmail}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item?.company}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-2 rounded-full font-semibold text-xs ${
                      item?.status
                        ? "text-green-600 bg-green-50"
                        : "text-blue-600 bg-blue-50"
                    }`}
                  >
                    {item.status?"Active":"Not Active"}
                  </span>
                </td>
                <td className="text-right px-6 whitespace-nowrap">
                  <Link
                    href={`/session/${item?.sessionId}`}
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
