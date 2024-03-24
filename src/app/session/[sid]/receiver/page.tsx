"use client"

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useState } from 'react'
import { questions } from '../../../../../constants';

export default function Session() {

    const approved = true;

    const [form, setForm] = useState(questions.map(q=>(
        {
            id: q.id,
            question: q.question,
            answer: ""
        }
    )))

    const [thankuNote,setThankuNote] = useState("");

    const handleSave = (e:any) => {
        e.preventDefault()
        console.log(form)
    }
    const handleSubmitThanku = (e:any) => {
        e.preventDefault()
        console.log(thankuNote)
    }

    


  return (
    <div className="min-h-screen">
    {
      approved
      ?
      <form className='w-[80%] mx-auto my-10 bg-white p-10 rounded-3xl shadow-md'>
      <div className="space-y-12">

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Congratulations, Your Referral Request was approved!, Send a thank you note</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Give a smile to the one who gave you one</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
          <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Write a thank you note.
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                  onChange={event => setThankuNote(event.target.value)}
                />
              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={(e)=>handleSubmitThanku(e)}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Send
        </button>
      </div>
      </form>
      :
      <form className='md:w-[60%] w-[80%] mx-auto my-10 bg-white p-10 rounded-3xl shadow-md'>
        <div className="space-y-12">

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Referral Questions</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Fill the from to get the referral</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              
              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Referral Giver&apos;s Email
                </label>
                <div className="mt-2">
                  <input
                    type="giversEmail"
                    name="giversEmail"
                    id="giversEmail"
                    autoComplete="giversEmail"
                    disabled
                    value = "sample1@gmail.com"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Referral Receiver&apos;s Email
                </label>
                <div className="mt-2">
                  <input
                    type="receiversEmail"
                    name="receiversEmail"
                    id="receiversEmail"
                    autoComplete="receiversEmail"
                    disabled
                    value = "sample2@gmail.com"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Company
                </label>
                <div className="mt-2">
                  <input
                    type="company"
                    name="company"
                    id="company"
                    autoComplete="company"
                    disabled
                    value = "Google"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>



              {
                  questions?.map((q,index)=>(
                      <div className="sm:col-span-6">
                          <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                              {q.question}
                          </label>
                          <div className="mt-2">
                              <input
                              type="text"
                              name={`question${index}`}
                              id={`question${index}`}
                              autoComplete={`question${index}`}
                              onChange={event => {
                                  setForm(form.map(f=>{
                                      if(f.id==index){
                                          return {
                                              ...f,
                                              answer: event.target.value
                                          }
                                      }
                                      return f
                                  }))
                              }}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                          </div>
                      </div>
                  ))
              }



            </div>
          </div>

        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link type="button" className="text-sm font-semibold leading-6 text-gray-900" href={"/"}>
            Cancel
          </Link>
          <button
            onClick={(e)=>handleSave(e)}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    }
    </div>
  )
}
