"use client";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import { questions } from "../../../../../constants";
import * as Dialog from "@radix-ui/react-dialog";

export default function ReceiverSession({sessionInfo}:{sessionInfo:any}) {
  const [approved, setApproved] = useState(false);

  const [form, setForm] = useState(
    questions.map((q) => ({
      id: q.id,
      question: q.question,
      answer: "",
    }))
  );

  const [thankuNote, setThankuNote] = useState("");

  const handleSave = () => {
    console.log(form);
  };
  const handleSubmitThanku = () => {
    console.log(thankuNote);
  };

  return (
    <div className="min-h-screen">
      {approved ? (
        <form className="w-[80%] mx-auto my-10 bg-white p-10 rounded-3xl shadow-md">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Congratulations, Your Referral Request was approved!, Send a
                thank you note
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Give a smile to the one who gave you one
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Write a thank you note.
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                      onChange={(event) => setThankuNote(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Dialog.Root>
              <Dialog.Trigger className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Send
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
                        Are you sure, you want to send?
                      </Dialog.Title>

                      <Dialog.Close asChild>
                        <button
                          onClick={() => handleSubmitThanku()}
                          className="w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 ring-blue-600 rounded-lg ring-offset-2 focus:ring-2"
                        >
                          Send
                        </button>
                      </Dialog.Close>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </form>
      ) : (
        <form className="md:w-[60%] w-[80%] mx-auto my-10 bg-white p-10 rounded-3xl shadow-md">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Referral Questions
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Fill the from to get the referral
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
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
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Referral Receiver&apos;s Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="receiversEmail"
                      name="receiversEmail"
                      id="receiversEmail"
                      autoComplete="receiversEmail"
                      disabled
                      value="sample2@gmail.com"
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
                      value="Google"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {questions?.map((q, index) => (
                  <div key={index} className="sm:col-span-6">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {q.question}
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name={`question${index}`}
                        id={`question${index}`}
                        autoComplete={`question${index}`}
                        onChange={(event) => {
                          setForm(
                            form.map((f) => {
                              if (f.id == index) {
                                return {
                                  ...f,
                                  answer: event.target.value,
                                };
                              }
                              return f;
                            })
                          );
                        }}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              href={"/"}
            >
              Cancel
            </Link>

            <Dialog.Root>
              <Dialog.Trigger className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Save
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
                        Are you sure, you want to save?
                      </Dialog.Title>

                      <Dialog.Close asChild>
                        <button
                          onClick={() => handleSave()}
                          className="w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 ring-blue-600 rounded-lg ring-offset-2 focus:ring-2"
                        >
                          Save
                        </button>
                      </Dialog.Close>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </form>
      )}
    </div>
  );
}
