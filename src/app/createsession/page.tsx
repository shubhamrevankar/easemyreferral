"use client"

import UserContext from '@/contexts/UserContext';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react'

export default function CreateSession() {

  const { user } = useContext(UserContext);

  const { push } = useRouter();

  const [ loadCreate, setLoadCreate ] = useState(false);


    const [sessionForm, setSessionForm] = useState({
        giversEmail: "",
        // receiversEmail: "",
        company: ""
    })

    const handleCreate = (e:any) => {
        e.preventDefault();

        setLoadCreate(true)
        console.log(sessionForm)

        fetch(`${process.env.GOOGLE_SHEETS_URL}?route=createSession&giverUserEmail=${sessionForm?.giversEmail}&receiverUserEmail=${user?.email}&company=${sessionForm?.company}`,{method: 'POST',})
        .then((res) => res.text())
        .then((data) => {
          setLoadCreate(false)
          push(`/session/${data}`)
        })


    }


  return (
    <form className='w-[80%] mx-auto my-10 bg-white p-10 rounded-3xl shadow-md'>
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
                  <option>Google</option>
                  <option>Microsoft</option>
                  <option>Oracle</option>
                  <option>Facebook</option>
                  <option>Netflix</option>
                </select>
              </div>
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
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
