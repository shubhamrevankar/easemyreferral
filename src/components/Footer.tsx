"use client";

import Link from "next/link";

export default function Footer() {
  const footerNavs = [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/aboutus",
      name: "About",
    },
  ];

  return (
    <footer className="text-gray-500 bg-white px-4 py-5 max-w-screen-2xl mx-auto md:px-8 border-t-2 border-gray-200 pt-10">
      <div className="max-w-lg sm:mx-auto sm:text-center">
        <img src="/logo.png" className="w-80 sm:mx-auto py-5" />
        <p className="leading-relaxed mt-2 text-[15px] font-bold">
          Simplifying Connections, Accelerating Careers
        </p>
      </div>
      <div className="mt-8 items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0">
          &copy; {new Date().getFullYear()} easemyreferral | All rights
          reserved.
        </div>
        <div className="mt-6 sm:mt-0">
          <ul className="flex items-center space-x-4">
            {footerNavs.map((item, idx) => (
                <li className=" hover:text-gray-800">
                    <Link key={idx} href={item.href}>
                    {item.name}
                    </Link>
                </li>
                ))}
          </ul>
        </div>
      </div>
      {/* <style jsx>{`
        .svg-icon path,
        .svg-icon polygon,
        .svg-icon rect {
          fill: currentColor;
        }
      `}</style> */}
    </footer>
  );
}
