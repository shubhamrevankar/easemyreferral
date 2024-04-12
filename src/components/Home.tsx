"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddIcon from "@mui/icons-material/Add";
import { redirect } from "next/navigation";
import Link from "next/link";

const Home = () => {
  return (
    <div className="mx-auto w-full max-w-screen-2xl h-screen max-h-[1000px]">
      {/* <div className="flex items-center justify-center h-screen max-h-[1000px]">
        <Link href={"/createsession"}>
          <Button>
            <AddIcon/> {" "} Create Session
          </Button>
        </Link>
      </div> */}
      <div
        className="w-full bg-center bg-cover h-full"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80")',
        }}
      >
        <div className="bg-gradient-to-t from-gray-800 h-full w-full">
          <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
            <div className="text-center px-10 md:pb-0 pb-36">
              <h1 className="text-6xl text-white lg:text-8xl font-bold">
                We{" "}
                <span className="pr-1 italic bg-gradient-to-r from-cyan-400  via-green-300 to-cyan-300 inline-block text-transparent bg-clip-text">
                  ease
                </span>{" "}
                your <br />{" "}
                <span className="inline-block sm:pt-8">Referral Process</span>
              </h1>
              {/* <button className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
              Start project
            </button> */}
              <Link href={"/createsession"} className="inline-block">
                <Button className="w-full px-4 py-5 md:px-5 md:py-8 mt-10 text-2xl md:text-3xl font-bold text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  Create Session
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
