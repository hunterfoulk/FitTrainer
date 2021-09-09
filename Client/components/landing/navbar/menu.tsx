import React from 'react'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Menu() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} transition={{ duration: 0.2 }} className="bg-[#0a0a0a] z-100 h-[350px] w-full absolute flex-col top-[80px]" style={{ zIndex: 500 }}>
            <div className="flex flex-row w-full justify-center">

                <div>
                    <img src="/images/dots.svg " />
                </div>
                <div>
                    <img src="/images/dots.svg " />
                </div>
            </div>
            <div className="flex items-center flex-col w-full h-full justify-around px-6">

                <li className="cursor-pointer inline mx-6 text-white text-md list-none text-[16px] hover:text-gray-300">About</li>
                <li className="cursor-pointer inline mx-6 text-white text-md list-none text-[16px] hover:text-gray-300">Features</li>
                <li className="cursor-pointer inline mx-6 text-white text-md list-none text-[16px] hover:text-gray-300">Contact</li>


            </div>


            <div className="flex flex-row w-full justify-center bg-[#0a0a0a] ">
                <div className="py-3 px-4 bg-transparent text-black m-2 py-2 flex justify-center items-center">
                    <Link href='/login' >
                        <span className="cursor-pointer text-white hover:text-gray-300">Log in</span>
                    </Link>
                </div>
                <div className="py-3 px-4 bg-white text-black m-2 py-2 flex justify-center items-center h-[40px]">
                    <Link href='/signup' >

                        <span className="text-semibold cursor-pointer">Sign up</span>
                    </ Link>
                </div>
            </div>

            <div className="flex flex-row w-full justify-center bg-[#0a0a0a] py-3">

                <div>
                    <img src="/images/dots.svg " />
                </div>
                <div>
                    <img src="/images/dots.svg " />
                </div>
            </div>
        </motion.div>
    )
}
