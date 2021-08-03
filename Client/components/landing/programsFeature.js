import React, { useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";


export default function programsFeature() {
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);


    return (
        <motion.div ref={ref}
            animate={controls}
            initial="hidden"
            transition={{ duration: 0.4 }}
            variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 1 }
            }} className="max-w-[1500px] w-full flex flex-col py-[150px] lg:flex-row">

            <div className="flex-1 py-5 pl-2">
                <div className="text-[36px] font-bold flex py-5 justify-center text-[#F5F5F5] lg:justify-start">

                    <span className="max-w-[80%] text-center lg:text-left">Try it for free and check how easy fitness goals and tracking could be</span>

                </div>
                <div className=" text-[22] font-bold flex flex-col items-center py-5 text-[#7C7C7C] lg:items-start">

                    <p className="max-w-[80%] mb-4 text-center lg:text-left">FitTrainer is a PWA training software with the purpose of making fitness trainers day to day lives easier.</p>
                    <p className="max-w-[80%] text-center lg:text-left">We make it easy for trainers to create appointments, create workouts, and attach workouts to client appointments.</p>
                </div>
            </div>
            <div className="flex-1 w-full relative min-h-[600px] max-h-[600px] ">

                <Image alt="Vercel logo" src="/images/iphoneexercises.png" layout='fill' objectFit="contain" loading="eager" />

            </div>
        </motion.div>


    )
}
