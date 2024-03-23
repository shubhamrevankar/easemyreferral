"use client"

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useState } from 'react'

export default function CreateSession() {


    const [sessionForm, setSessionForm] = useState({
        giversEmail: "",
        sendersEmail: "",
        company: ""
    })

    const handleCreate = () => {
        console.log(sessionForm)
    }


  return (
    <form className='w-[80%] mx-auto my-10 bg-white p-10 rounded-3xl shadow-md'>
      <div className="space-y-12">

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Create a session for your referral</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Give email of the users involved in this session</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Referral Giver&apos;s Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="givers-email"
                  id="givers-email"
                  autoComplete="givers-email"
                  onChange={event => setSessionForm({...sessionForm,giversEmail:event.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Referral Sender&apos;s Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="senders-email"
                  id="senders-email"
                  autoComplete="senders-email"
                  onChange={event => setSessionForm({...sessionForm,sendersEmail:event.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900">
                Company
              </label>
              <div className="mt-2">
                <select
                  id="company"
                  name="company"
                  autoComplete="company-name"
                  onChange={event => setSessionForm({...sessionForm,company:event.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
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
        <button
          onClick={()=>handleCreate()}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
