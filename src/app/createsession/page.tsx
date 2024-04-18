"use client"

import UserContext from '@/contexts/UserContext';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react'
import { useEdgeStore } from '@/lib/edgestore';

export default function CreateSession() {

  
  const [ listCompanies, setListCompanies ] = useState([]);

  const { user } = useContext(UserContext);

  const { push } = useRouter();

  const [ loadCreate, setLoadCreate ] = useState(false);

  useEffect(()=>{
    fetch(`${process.env.GOOGLE_SHEETS_URL}?route=getAllCompanies`)
    .then((res) => res.json())
    .then((data) => {
      setListCompanies(data)
    })
  },[])


    const [sessionForm, setSessionForm] = useState({
        giversEmail: "",
        // receiversEmail: "",
        company: ""
    })

    const handleCreate = (e:any) => {
        e.preventDefault();

        setLoadCreate(true)
        console.log(sessionForm)

        fetch(`${process.env.GOOGLE_SHEETS_URL}?route=createSession&giverUserEmail=${sessionForm?.giversEmail}&receiverUserEmail=${user?.email}&company=${sessionForm?.company}&attachedResume=${user?.resumeUrl}`,{method: 'POST',})
        .then((res) => res.text())
        .then((data) => {
          push(`/session/${data}`)
        })


    }


    const [resume, setResume] = useState<File | null>(null);

    const { edgestore } = useEdgeStore();


    const storeFile = async (resume: File) => {
      const res = await edgestore.publicFiles.upload({
        file: resume,
        onProgressChange: (progress) => {
          // you can use this to show a progress bar
          // console.log(progress);
        },
      });

      fetch(`${process.env.GOOGLE_SHEETS_URL}?route=updateUser&resumeUrl=${res.url}&userId=${user?.userId}`,{method: 'POST',})
        .then((res) => res.text())
        .then((data) => {
          console.log("200")
        })
    }

    useEffect(()=>{
      if(resume){
        storeFile(resume);
      }
    },[resume])


  return (
    <form className='md:w-[80%] w-[95%] mx-auto my-10 bg-white p-10 rounded-3xl shadow-md'>
      <div className="space-y-12">

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl font-semibold leading-7 text-gray-900">Create a session for your referral</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Give the information for the creation of the session</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-lg font-medium leading-6 text-gray-900">
                Who are you seeking a referral from?
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="givers-email"
                  id="givers-email"
                  autoComplete="givers-email"
                  placeholder='Write the email of that person'
                  onChange={event => setSessionForm({...sessionForm,giversEmail:event.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-lg font-medium leading-6 text-gray-900">
                Referral Receiver&apos;s Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="receivers-email"
                  id="receivers-email"
                  autoComplete="receivers-email"
                  onChange={event => setSessionForm({...sessionForm,receiversEmail:event.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}

            <div className="sm:col-span-3">
              <label htmlFor="company" className="block text-lg font-medium leading-6 text-gray-900">
                For which Company
              </label>
              <div className="mt-2">
                <select
                  id="company"
                  name="company"
                  autoComplete="company-name"
                  onChange={event => setSessionForm({...sessionForm,company:event.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Select</option>
                  {
                    listCompanies.map((c,i)=>(
                      <option key={i}>{c}</option>
                    ))
                  }
                </select>
              </div>
            </div>

            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="1em"
                  height="1em"
                >
                  <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
                </svg>
                <h1 className="px-2 text-sm">Attached Resume</h1>
                {
                  user.resumeUrl ?
                  <a
                  href={user.resumeUrl} rel="noopener" target="_blank"
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                  View
                </a>
                :
                <div className="text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    {
                      resume?
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
                {
                  resume?
                  resume.name
                  :
                  <p className="text-xs leading-5 text-gray-600">pdf up to 10MB</p>
                }
              </div>
                }
              </div>
          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link type="button" className="text-sm font-semibold leading-6 text-gray-900" href={"/"}>
          Cancel
        </Link>
        {
          loadCreate ?
          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Creating...
          </button>
          :
          <button
            onClick={(e)=>handleCreate(e)}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        }
      </div>
    </form>
  )
}
