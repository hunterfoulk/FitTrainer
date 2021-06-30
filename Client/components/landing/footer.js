import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import { AiOutlineFacebook } from 'react-icons/ai';
import { FiTwitter } from 'react-icons/fi';

export default function Footer() {
    return (
        <div className="w-full max-w-[1500px] flex mt-[120px] px-2 ">
            <div className="flex flex-col md:flex-row w-full h-full border-[#808080af] border-t pt-10 pb-1">
                <div className="flex-1 flex-col h-full">

                    <div className="h-full relative flex items-center py-2">
                        <Image alt="Vercel logo" src="/images/weightslogocrimson.png" height={37} width={35} className="avatar" loading="eager" />
                        <span className="mx-1 text-white text-[22px] font-bold">FitTrainer</span>
                    </div>
                    <div className=" w-full text-[#808080] md:w-[70%] lg:w-1/2 py-2 pr-2">
                        <p>We believe in providing great fitness training software and tools for all trainers to have access to.</p>
                    </div>
                    <div className="flex flex-row text-xl text-[#F5F5F5] py-3">
                        <FiTwitter className="mr-4" />
                        <AiOutlineFacebook className="mr-4" />
                        <FaInstagram className="mr-4" />
                    </div>
                </div>
                <div className="flex justify-around flex-1 ">
                    <div className="py-2 pr-2 flex flex-1 items-center flex-col">
                        <h1 className="text-white font-bold text-[16px] mb-2">Premium</h1>
                        <li className="text-[#808080] mb-2">Pro</li>
                        <li className="text-[#808080] mb-2">FAQs</li>
                        <li className="text-[#808080] mb-2">Free Trial</li>

                    </div>
                    <div className="py-2 pr-2 flex flex-1 items-center flex-col">
                        <h1 className="text-white font-bold text-[16px] mb-2">Resources</h1>
                        <li className="text-[#808080] mb-2">Home</li>
                        <li className="text-[#808080] mb-2">Features</li>
                        <li className="text-[#808080] mb-2">Get Started</li>
                    </div>
                    <div className="py-2 pr-2 flex flex-1 items-center flex-col">
                        <h1 className="text-white font-bold text-[16px] mb-2">Get in touch</h1>
                        <li className="text-[#808080] mb-2">Help</li>
                        <li className="text-[#808080] mb-2">Contact Us</li>
                        <li className="text-[#808080] mb-2">App</li>
                    </div>
                </div>
            </div>
        </div>
    )
}
