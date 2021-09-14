import React, { useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function WorkoutSection() {
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
            }} className="w-full flex-col flex-col-reverse items-center flex max-w-[1500px] py-10 mt-20 mb-20 lg:flex-row lg:items-start">
            <div className="w-[100%] w-full relative min-h-[600px] max-h-[600px] lg:w-[60%]">

                <Image alt="Vercel logo" src="/images/newipad5.png" layout='fill' objectFit="contain" loading="eager" />

            </div>

            <div className="w-[80%] w-full relative text-white text-right text-4xl font-Roboto py-4 px-3 font-bold max-h-[600px] lg:w-[40%] ">
                <span>Customizble workouts with a 200+ exercise database to choose from</span>

            </div>
        </motion.div>
    )
}
