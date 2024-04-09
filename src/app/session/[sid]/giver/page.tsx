"use client";

import React, { useState } from "react";
import { answers } from "../../../../../constants";

import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

const GiverSession = ({sessionInfo}:any) => {
  const [gotThankYouNote, setGotThankYouNote] = useState(false);

  const [approved, setApproved] = useState(false);

  const router = useRouter();

  const handleApprove = (e: any) => {

    if(approved) return;

    setApproved(!approved);

    fetch(`${process.env.GOOGLE_SHEETS_URL}?route=acceptSession&sessionId=${sessionInfo?.sessionId}`,{method: 'POST',})
    .then((res) => res.text())
    .then((data) => {
      // console.log(data)
      router.refresh();
    })

  };

  return (
    <section className="bg-white dark:bg-gray-900 min-h-[750px]">
      <div className="container max-w-4xl px-6 py-10 mx-auto">
        {sessionInfo?.thankuNote ? (
          <>
            <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white my-10">
              Yey, you&apos;ve got a Thank you note!
            </h1>
            <div className="my-5 border-2 border-gray-100 rounded-lg dark:border-gray-700">
              <span className="flex items-center justify-between w-full p-8">
                <h1 className="font-semibold text-gray-700 dark:text-white">
                  Thank you note
                </h1>
              </span>
              <hr className="border-gray-200 dark:border-gray-700" />
              <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                {sessionInfo?.thankuNote}
              </p>
            </div>
            <form className="md:w-[60%] w-[80%] mx-auto mt-3 mb-10 bg-white p-10 rounded-3xl shadow-md">
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-xl font-semibold leading-7 text-gray-900">
                    Session Information
                  </h2>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Referral Giver&apos;s Email
                      </label>
                      <div className="mt-2">
                        <input
                          type="giversEmail"
                          name="giversEmail"
                          id="giversEmail"
                          autoComplete="giversEmail"
                          disabled
                          value="sample1@gmail.com"
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div> */}

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        You are giving the referral to:
                      </label>
                      <div className="mt-2">
                        <input
                          type="receiversEmail"
                          name="receiversEmail"
                          id="receiversEmail"
                          autoComplete="receiversEmail"
                          disabled
                          value={sessionInfo?.receiverUserEmail}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Company
                      </label>
                      <div className="mt-2">
                        <input
                          type="company"
                          name="company"
                          id="company"
                          autoComplete="company"
                          disabled
                          value={sessionInfo?.company}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </>
        ) : (
          
            <form className="md:w-[60%] w-[80%] mx-auto mt-3 mb-10 bg-white p-10 rounded-3xl shadow-md">
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Session Information
                  </h2>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Referral Giver&apos;s Email
                      </label>
                      <div className="mt-2">
                        <input
                          type="giversEmail"
                          name="giversEmail"
                          id="giversEmail"
                          autoComplete="giversEmail"
                          disabled
                          value="sample1@gmail.com"
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div> */}

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        You are giving the referral to:
                      </label>
                      <div className="mt-2">
                        <input
                          type="receiversEmail"
                          name="receiversEmail"
                          id="receiversEmail"
                          autoComplete="receiversEmail"
                          disabled
                          value={sessionInfo?.receiverUserEmail}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Company
                      </label>
                      <div className="mt-2">
                        <input
                          type="company"
                          name="company"
                          id="company"
                          autoComplete="company"
                          disabled
                          value={sessionInfo?.company}
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3 flex items-end justify-center">
                      {
                        approved ?
                      <div className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-rosette-discount-check"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
                            <path d="M9 12l2 2l4 -4" />
                          </svg>
                          <span className="mx-1">
                            {approved ? "Accepted" : "Accept"}
                          </span>
                        </div>
                        :
                      <Dialog.Root>
                        <Dialog.Trigger className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-rosette-discount-check"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
                            <path d="M9 12l2 2l4 -4" />
                          </svg>
                          <span className="mx-1">
                            {approved ? "Accepted" : "Accept"}
                          </span>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                          <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 w-full h-full bg-black opacity-40" />
                          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
                            <div className="bg-white rounded-md shadow-lg px-4 py-6">
                              <div className="flex items-center justify-end">
                                <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 mx-auto"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </Dialog.Close>
                              </div>
                              <div className="max-w-sm mx-auto space-y-3 text-center ">
                                <Dialog.Title className="text-lg font-medium text-gray-800 ">
                                  {approved
                                    ? "Reject?"
                                    : "Are you sure, you want to accept?"}
                                </Dialog.Title>

                                <Dialog.Close asChild>
                                  <button
                                    onClick={(e) => handleApprove(e)}
                                    className={` w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white ${
                                      approved
                                        ? "bg-red-600 hover:bg-red-500 active:bg-red-700 ring-red-600"
                                        : "bg-green-600 hover:bg-green-500 active:bg-green-700 ring-green-600"
                                    } rounded-lg ring-offset-2 focus:ring-2`}
                                  >
                                    {approved ? "Disapprove" : "Accept"}
                                  </button>
                                </Dialog.Close>
                              </div>
                            </div>
                          </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog.Root>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </form>
            )}
            <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white">
              Referral question response
            </h1>
            <div className="mt-12 space-y-8">
              {sessionInfo?.formResponse && JSON.parse(sessionInfo?.formResponse)?.length !== 0 ? (
                JSON.parse(sessionInfo?.formResponse).map((a:any, i:any) => (
                  <div
                    key={i}
                    className="border-2 border-gray-100 rounded-lg dark:border-gray-700"
                  >
                    <span className="flex items-center justify-between w-full p-8">
                      <h1 className="font-semibold text-gray-700 dark:text-white">
                        {a.question}
                      </h1>
                    </span>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                      {a.answer}
                    </p>
                  </div>
                ))
              ) : (
                <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
                  <span className="flex items-center justify-center w-full p-8">
                    <h1 className="font-semibold text-gray-700 dark:text-white">
                      No response
                    </h1>
                  </span>
                </div>
              )}
            </div>
          
      </div>
    </section>
  );
};

export default GiverSession;
