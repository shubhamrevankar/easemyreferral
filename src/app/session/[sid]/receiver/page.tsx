"use client";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { questions } from "../../../../../constants";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from '@/components/ui/use-toast';
import { useEdgeStore } from "@/lib/edgestore";
import UserContext from "@/contexts/UserContext";

export default function ReceiverSession({sessionInfo}:any) {



  const { user } = useContext(UserContext);


  const [form, setForm] = useState([{
    id:1,
    question: "",
    answer: ""
  }]);


  const getCompanyQuestion = () => {

    fetch(`${process.env.GOOGLE_SHEETS_URL}?route=getCompanyQuestions&companyName=${sessionInfo?.company}`)
        .then((res) => res.json())
        .then((data) => {
          setForm(data.map((q:any,i:any) => ({
            id: i,
            question: q,
            answer: "",
          })))
        })

  } 

  
  useEffect(()=>{
    if(sessionInfo?.formResponse!=""){
      setForm(JSON.parse(sessionInfo?.formResponse))
    }
    else{
      getCompanyQuestion()
    }
  },[])


  const [thankuNote, setThankuNote] = useState("");

  const handleSave = () => {
    // console.log(form);

    fetch(`${process.env.GOOGLE_SHEETS_URL}?route=updateSession&formResponse=${JSON.stringify(form)}&sessionId=${sessionInfo?.sessionId}`,{method: 'POST',})
    .then((res) => res.text())
    .then((data) => {
      toast({
        title: "Your response has submitted successfully",
      })
      console.log(data)
    })

  };
  const handleSubmitThanku = () => {
    // console.log(thankuNote);

    
    fetch(`${process.env.GOOGLE_SHEETS_URL}?route=addThankuNote&thankuNote=${thankuNote}&sessionId=${sessionInfo?.sessionId}`,{method: 'POST',})
    .then((res) => res.text())
    .then((data) => {
      toast({
        title: "Your Thankyou note has submitted successfully",
      })
      console.log(data)
    })


  };

  // console.log(sessionInfo)


  if(sessionInfo?.status==false){
    return (
      <div className="min-h-screen">
        <div className="container max-w-4xl px-6 py-10 mx-auto">
        <form className="w-[100%] mx-auto my-10 bg-white p-10 rounded-3xl shadow-md">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Session Closed
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    You were seeking a referral from:
                  </label>
                  <div className="mt-2">
                    <input
                      type="giversEmail"
                      name="giversEmail"
                      id="giversEmail"
                      autoComplete="giversEmail"
                      disabled
                      value={sessionInfo?.giverUserEmail}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* <div className="sm:col-span-3">
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
                </div> */}

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    For the Company:
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

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Attached Resume:
                  </label>
                  <div className="mt-2 w-16">
                    {
                      sessionInfo?.attachedResume ?
                      <a
                      href={sessionInfo?.attachedResume} rel="noopener" target="_blank"
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                    >
                      View
                    </a>
                    :
                      <p>NA</p>
                    }
                  </div>
                </div>


              </div>
            </div>
          </div>

        </form>
        <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white">
                Your Submitted Response
              </h1>
              <div className="mt-12 space-y-8">
              { sessionInfo?.formResponse && JSON.parse(sessionInfo?.formResponse)?.length !== 0 && (
                JSON.parse(sessionInfo?.formResponse)?.map((a:any, i:any) => (
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
              )}
            </div>
        </div>
      </div>
    )
  }



  const [resume, setResume] = useState<File | null>(null);

  const [resumeUrl, setResumeUrl] = useState(user?.resumeUrl)

    const { edgestore } = useEdgeStore();

    const storeFile = async (resume: File) => {
      const res = await edgestore.publicFiles.upload({
        file: resume,
      });
      fetch(`${process.env.GOOGLE_SHEETS_URL}?route=updateUser&resumeUrl=${res?.url}&userId=${user?.userId}`,{method: 'POST',})
        .then((res) => res.text())
        .then((data) => {
          toast({
            title: "Resume Updated Successfully",
          })
          setResumeUrl(res?.url)
        })
    }

    useEffect(()=>{
      if(resume){
        storeFile(resume);
      }
    },[resume])




  return (
    <div className="min-h-screen">
      <div className="container max-w-4xl px-6 py-10 mx-auto">
      {sessionInfo?.accepted ? (
        <form className="w-[80%] mx-auto my-10 bg-white p-10 rounded-3xl shadow-md">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Congratulations, Your Referral Request was acceped!, Send a
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
        <>
        <form className="w-[100%] mx-auto mb-10 md:mt-10 bg-white p-10 rounded-3xl shadow-md">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Referral Questions
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Fill the from to get the referral
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    You are seeking a referral from:
                  </label>
                  <div className="mt-2">
                    <input
                      type="giversEmail"
                      name="giversEmail"
                      id="giversEmail"
                      autoComplete="giversEmail"
                      disabled
                      value={sessionInfo?.giverUserEmail}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* <div className="sm:col-span-3">
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
                </div> */}

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    For the Company:
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

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Attached Resume:
                  </label>
                  <div className="mt-2 flex items-center gap-3">
                  {
                  resumeUrl ?
                  <a
                  href={resumeUrl} rel="noopener" target="_blank"
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
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
                    className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-down"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5l0 14" />
                    <path d="M18 13l-6 6" />
                    <path d="M6 13l6 6" />
                  </svg>
                  View
                </a>
                :
                  <p>NA</p>
                }
                    <div className="flex text-sm leading-6 text-gray-600 items-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    {
                      resumeUrl?
                      <span>Edit</span>
                      :
                      <span>Upload a file</span>
                    }
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      accept=".pdf"
                      className="sr-only" 
                      onChange={event => setResume(event.target.files ? event.target.files[0] : null)} 
                      />
                  </label>
                </div>
                  </div>
                </div>

                {form?.map((q, index) => (
                  <div key={index} className="sm:col-span-6">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {q?.question}
                    </label>
                    <div className="mt-2">
                      <textarea
                        name={`question${index}`}
                        id={`question${index}`}
                        autoComplete={`question${index}`}
                        value={q.answer}
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
                {sessionInfo?.formResponse?"Resubmit":"Submit"}
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
                        Are you sure, you want to {sessionInfo?.formResponse?"Resubmit":"Submit"}?
                      </Dialog.Title>

                      <Dialog.Close asChild>
                        <button
                          onClick={() => handleSave()}
                          className="w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 ring-blue-600 rounded-lg ring-offset-2 focus:ring-2"
                        >
                          {sessionInfo?.formResponse?"Resubmit":"Submit"}
                        </button>
                      </Dialog.Close>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </form>
        {
          sessionInfo?.formResponse &&
            <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white">
                Your Submitted Response
              </h1>
        }
            <div className="mt-12 space-y-8">
            
              { sessionInfo?.formResponse && JSON.parse(sessionInfo?.formResponse)?.length !== 0 && (
                JSON.parse(sessionInfo?.formResponse)?.map((a:any, i:any) => (
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
              )}
            </div>
        </>
      )}
      </div>
    </div>
  );
}
