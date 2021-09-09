import React, { useEffect } from 'react'
import styles from "../../styles/Header.module.scss"
import Image from 'next/image'
import Link from 'next/link';
import { MdPlayArrow } from 'react-icons/md';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Header() {
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);


    return (
        <>
            <motion.div ref={ref}
                animate={controls}
                initial="hidden"
                transition={{ duration: 0.4 }}
                variants={{
                    visible: { opacity: 1, scale: 1 },
                    hidden: { opacity: 0, scale: 1 }
                }} className="w-full flex justify-center items-center max-w-[1500px] py-14 mb-10 mt-12">
                <div className="w-full flex-col flex mt-5 lg:flex-row">
                    <div className="flex py-6 items-center mb-4 justify-center lg:mb-0">
                        <div className=" flex flex-col items-center w-[100%] max-w-full lg:items-start justify-center">
                            {/* <div className="text-lg text-[#F5F5F5] text-center py-5 text-[#808080] lg:text-left">
                                <h1>FOR TRAINERS BY TRAINERS</h1>
                            </div> */}
                            <div className="text-5xl w-[100%] font-bold text-center flex py-5 text-[#F5F5F5] lg:text-left">
                                <p>The Online Training Software Designed By Trainers For Trainers</p>
                            </div>
                            <div className="text-lg font-bold text-center flex py-5 text-[#7c7c7c] lg:text-left">
                                <p>Coming soon to</p>
                            </div>
                            <div className="flex w-full justify-center flex-row items-center mb-5 lg:justify-start">

                                <img src="/images/googleplay.png" className="max-h-[46px] w-[153px]" />
                                <img src="/images/appstore1.png" className="max-h-[46px] w-[152px] ml-5" />

                            </div>
                        </div>
                    </div>
                    <div className="flex w-full relative pl-2 items-end justify-end min-h-[460px] w-full lg:min-h-[520px]">
                        {/* <img alt="Vercel logo" src="/images/headersvg.png" className="" /> */}
                        <Image alt="Vercel logo" src="/images/newheader.png" layout='fill' objectFit="contain" loading="eager" />
                    </div>
                </div>
            </motion.div>
        </>

    )
}
