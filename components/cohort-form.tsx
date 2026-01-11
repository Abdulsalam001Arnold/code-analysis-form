

'use client'

import React, {useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {toast, ToastContainer} from "react-toastify";
import {motion, AnimatePresence} from "framer-motion";

const CohortForm = () => {
    const [cohortName, setCohortName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [course, setCourse] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            setLoading(true)
        const res = await fetch('/api/cohort-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cohortName, startDate, endDate, course})
        })

        const data = await res.json();
        if(res.ok) {
            toast.success('Form Submitted Successfully!')
            setCohortName("")
            setStartDate("")
            setEndDate("")
            setCourse("")
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
                        width={200}
                        height={200}
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Submit your project here!</h2>
                </div>

                <AnimatePresence>
                <motion.div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
                initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.7, ease: "easeInOut",stiffness: 700, delay: 0.25}}
                >
                    <form method="POST" onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="cohortName" className="block text-sm/6 font-medium text-gray-100">
                                Cohort Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="cohortName"
                                    name="cohortName"
                                    type="text"
                                    value={cohortName} 
                                    onChange={(e) => setCohortName(e.target.value)}
                                    required
                                    autoComplete="cohortName"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="startDate" className="block text-sm/6 font-medium text-gray-100">
                                Start Date
                            </label>
                            <div className="mt-2">
                                <input
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    required
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}

                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-sm/6 font-medium text-gray-100">
                                End Date
                            </label>
                            <div className="mt-2">
                                <input
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    required
                                    value={endDate}

                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="course" className="block text-sm/6 font-medium text-gray-100">
                               Course
                            </label>
                            <div className="mt-2">
                                <input
                                    id="course"
                                    name="course"
                                    type="text"
                                    required
                                    value={course}

                                    onChange={(e) => setCourse(e.target.value)}
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
                </motion.div>
                </AnimatePresence>
            </div>
        </>
    )
}

export default React.memo(CohortForm)