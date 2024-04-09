"use client"

import { toast } from '@/components/ui/use-toast';
import UserContext from '@/contexts/UserContext';
import { useEdgeStore } from '@/lib/edgestore';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

export default function UpdateProfile() {

    const { user } = useContext(UserContext);

    const [loadSave,setLoadSave] = useState(false);


    const [profile, setProfile] = useState(user);

    useEffect(()=>{
      setProfile(user)
    },[user])

    // console.log(profile)

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
      setProfile({...profile,resumeUrl:res.url})
    }

    useEffect(()=>{
      if(resume){
        storeFile(resume);
      }
    },[resume])

    const handleSave = () => {

        if(loadSave) return

        setLoadSave(true)

        fetch(`${process.env.GOOGLE_SHEETS_URL}?route=updateUser&userId=${profile?.userId}&firstName=${profile?.firstName}&lastName=${profile?.lastName}&email=${profile?.email}&clerkId=${profile?.clerkId}&imageUrl=${profile?.imageUrl}&phone=${profile?.phone}&company=${profile?.company}&about=${profile?.about}&resumeUrl=${profile?.resumeUrl}`,{method: 'POST',})
        .then((res) => res.text())
        .then((data) => {
          toast({
            title: "Profile Updated Successfully",
          })
          setLoadSave(false)
        })

    }


  //   {
  //     "url": "https://files.edgestore.dev/mt5tm1sxvqi1hl3z/publicFiles/_public/b7606cb8-596e-4819-91bd-4a727556a698.pdf",
  //     "thumbnailUrl": null,
  //     "size": 709361,
  //     "uploadedAt": "2024-04-05T10:37:36.288Z",
  //     "path": {},
  //     "pathOrder": [],
  //     "metadata": {}
  // }


  return (
    <form className='lg:w-[60%] w-[80%] mx-auto my-10 bg-white p-10 rounded-3xl shadow-md'>
      <div className="space-y-12">

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl font-semibold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">You can update your profile anytime in the profile section</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-lg font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  value={profile.firstName}
                  onChange={event => setProfile({...profile,firstName:event.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-lg font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  value={profile.lastName}
                  onChange={event => setProfile({...profile,lastName:event.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={profile.email}
                  disabled
                  onChange={event => setProfile({...profile,email:event.target.value})}
                  className="bg-gray-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  autoComplete="phone"
                  value={profile.phone}
                  onChange={event => setProfile({...profile,phone:event.target.value})}
                  className="ps-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">
                Company in which you work
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  value={profile.company}
                  onChange={event => setProfile({...profile,company:event.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Unemployed</option>
                  <option>Google</option>
                  <option>Microsoft</option>
                  <option>Oracle</option>
                  <option>Facebook</option>
                  <option>Netflix</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-lg font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                  value={profile.about}
                  onChange={event => setProfile({...profile,about:event.target.value})}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-lg font-medium leading-6 text-gray-900">
                Resume
              </label>
              <div className="flex my-3 items-center">
                <p className='text-sm me-5'>Previously uploaded: </p>
                <a
                    href={user.resumeUrl} rel="noopener" target="_blank"
                    className="inline-block text-center w-28  py-1.5 text-sm text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                  >View</a>
              </div>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
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
                        className="sr-only" 
                        onChange={event => setResume(event.target.files ? event.target.files[0] : null)} 
                        />
                    </label>
                    { !resume && <p className="pl-1">or drag and drop</p>}
                  </div>
                  {
                    resume?
                    resume.name
                    :
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  }
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link type="button" className="text-sm font-semibold leading-6 text-gray-900" href={"/"}>
          Cancel
        </Link>
        <p
          onClick={()=>handleSave()}
          className={"cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" + (loadSave?"animate-pulse":"")}
        >
          Save
        </p>
      </div>
    </form>
  )
}
