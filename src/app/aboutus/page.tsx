import React from "react";
import Image from "next/image";

import ShubhamImg from "@/images/ShubhamRevankar.jpg";
import DhirajImg from "@/images/DhirajGandhi.jpeg";

import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

const AboutUs = () => {
  return (
    <section className="bg-white dark:bg-gray-900 pb-20">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
          About Us
        </h1>
        <p className="max-w-5xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300 text-sm sm:text-base">
          Welcome to easemyreferral.com, the platform that revolutionizes the
          way referrals work. Born out of a desire to streamline the referral
          process, we&apos;re dedicated to making job referrals efficient,
          rewarding, and hassle-free.
          <br />
          Our platform connects job seekers and referral providers, offering a
          unique space where connections can be leveraged for career growth. We
          understand the challenges both parties face - the time-consuming
          nature of the process for providers, and the often daunting task of
          asking for referrals for seekers. That&apos;s why we&apos;ve created a
          solution that benefits everyone.
          <br />
          With features like LinkedIn integration, standardized referral
          questions and one-time resume uploads, we aim to make the referral
          process as smooth as possible.
          <br />
          Join us on our mission to simplify referrals and transform the way we
          connect, communicate, and grow in our careers.
        </p>
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl mt-16 dark:text-white">
          Our Team
        </h1>
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 xl:grid-cols-2 lg:w-[60%] lg:mx-auto">
          <div className="flex flex-col items-center p-8 transition-colors duration-300 transform border rounded-xl hover:border-transparent group hover:bg-blue-600 dark:border-gray-700 dark:hover:border-transparent">
            <Image
              className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
              src={ShubhamImg}
              width={500}
              height={500}
              alt="Shubham Revankar"
            />
            <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">
              Shubham Revankar
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-300 group-hover:text-gray-300">
              Founder & CEO
            </p>
            <div className="flex mt-3 -mx-2">
              <a
                href="mailto:business.shubhamrevankar@gmail.com"
                className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                aria-label="Mail"
              >
                <EmailIcon sx={{ fontSize: 30 }} />
              </a>
              <a
                href="https://www.linkedin.com/in/shubhamrevankar/"
                className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                aria-label="Linkedin"
              >
                <LinkedInIcon sx={{ fontSize: 30 }} />
              </a>
              <a
                href="https://www.instagram.com/shubhamrevankar8668/"
                className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                aria-label="Instagram"
              >
                <InstagramIcon sx={{ fontSize: 30 }} />
              </a>
              <a
                href="https://twitter.com/iamshubham8668"
                className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                aria-label="twitter"
              >
                <XIcon sx={{ fontSize: 30 }} />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center p-8 transition-colors duration-300 transform border rounded-xl hover:border-transparent group hover:bg-blue-600 dark:border-gray-700 dark:hover:border-transparent">
            <Image
              className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
              src={DhirajImg}
              width={500}
              height={500}
              alt="Dhiraj Gandhi"
            />
            <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">
              Dhiraj Gandhi
            </h1>
            <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
              Mentor
            </p>
            <div className="flex mt-3 -mx-2">
              <a
                href="mailto:ddgandhi.96@gmail.com"
                className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                aria-label="Mail"
              >
                <EmailIcon sx={{ fontSize: 30 }} />
              </a>
              <a
                href="https://www.linkedin.com/in/dhirajdgandhi/"
                className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                aria-label="Linkedin"
              >
                <LinkedInIcon sx={{ fontSize: 30 }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
