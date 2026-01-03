'use client'

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import gsap from "gsap";
import {useEmailStore} from "@/store/userEmailStore";

const ProjectSubmittedSuccess = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [countDown, setCountDown] = useState(40);
    const {email: userEmail} = useEmailStore();
    useEffect(() => {
        const timer = setInterval(() => {
            if(countDown <= 0) return clearInterval(
                timer
            )
            setCountDown(countDown - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [countDown])


    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(iconRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
            });

            gsap.from(textRef.current?.children || [], {
                y: 20,
                opacity: 0,
                stagger: 0.15,
                duration: 0.6,
                ease: "power3.out",
                delay: 0.3,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4"
        >
            <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {/* Icon */}
                <div ref={iconRef} className="flex justify-center mb-6">
                    <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircle className="w-14 h-14 text-green-600" />
                    </div>
                </div>

                {/* Text */}
                <div ref={textRef}>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        Project Submitted Successfully 🎉
                    </h1>

                    <p className="text-gray-600 mb-4">
                        Your project has been received and is now under review.
                    </p>

                    <p className="text-gray-700 mb-6">
                        Please check your <span className="font-semibold">email ({userEmail}) in {countDown} seconds</span> for:
                    </p>

                    <ul className="text-left max-w-sm mx-auto space-y-2 mb-6">
                        <li className="flex items-start gap-2">
                            <span className="text-green-600">✔</span>
                            <span className={'text-black'} >Your <strong>grade</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600">✔</span>
                            <span className={'text-black'}>A clear <strong>project summary</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600">✔</span>
                            <span className={'text-black'}>Detailed <strong>feedback & improvement suggestions</strong></span>
                        </li>

                        <li className="flex items-start gap-2">
                            <span className="text-green-600">✔</span>
                            <span className={'text-black'}>Summarized <strong>audio feedback.</strong></span>
                        </li>
                    </ul>

                    <p className="text-sm text-gray-500">
                        If you don’t see the email within a few minutes, please check your spam folder.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProjectSubmittedSuccess;
