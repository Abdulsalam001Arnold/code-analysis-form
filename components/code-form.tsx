'use client'

import React, {useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEmailStore} from "@/store/userEmailStore";
import {toast, ToastContainer} from "react-toastify";
const CodeForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [link, setLink] = useState("");
    const [techSchool, setTechSchool] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {setEmail: setEmailStore} = useEmailStore();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            setLoading(true)
        const res = await fetch('/api/code-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fullName, email, link, techSchool})
        })

        const data = await res.json();
        if(res.ok) {
            setEmailStore(email)
            toast.success('Form Submitted Successfully!')
            setFullName("")
            setEmail("")
            setLink("")
            setTechSchool("")
            router.push('/success')
        }else{
            toast.error('Something went wrong!, Please try again later')
        }

        }catch (err) {
            if(err instanceof Error) {
                toast.error(err.message)
                console.error(err.message)
                setError(err.message)
            }
        }finally {
            setLoading(false)
        }
    }
    return(
        <>
            <ToastContainer/>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        alt="Your Company"
                        src="/anime-girl-crazy.jpg"
                        className="mx-auto h-30 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Submit your project here!</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form method="POST" onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="fullName" className="block text-sm/6 font-medium text-gray-100">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    autoComplete="fullname"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                                Github URL
                            </label>
                            <div className="mt-2">
                                <input
                                    id="link"
                                    name="link"
                                    type="text"
                                    required
                                    value={link}

                                    onChange={(e) => setLink(e.target.value)}
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                               Tech School (IT company name)
                            </label>
                            <div className="mt-2">
                                <input
                                    id="techSchool"
                                    name="techSchool"
                                    type="text"

                                    value={techSchool}

                                    onChange={(e) => setTechSchool(e.target.value)}
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>


                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default React.memo(CodeForm)