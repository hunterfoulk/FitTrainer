import React, { useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function GetStarted() {
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
            }} className="flex-col started:flex flex-row w-full mt-[160px] p-5 max-w-[1500px]">

            <div className="flex flex-col w-full max-w-[100%] items-center started:max-w-[100%] flex flex-col flex-1 items-start px-2 py-10 ">
                <div className="flex flex-col w-full  max-w-[100%] started:max-w-[90%] flex flex-col lg:max-w-[80%] text-left">
                    <span className="mb-3 text-[#F5F5F5] text-4xl font-bold text-center started:text-left">
                        Ready to get started? Find out which plan is best for you.
                    </span>
                    <div className="flex justify-center started:justify-start mt-3">
                        <button className="text-[#F5F5F5] bg-[#cf2121] text-lg font-bold p-2 min-w-[140px] rounded-[3px] ">Get Started</button>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex justify-center mb-[30px] started:justify-end flex-1 px-2">
                <div >
                    <Image
                        src="/images/guyjumping.jpg"
                        alt="Picture of the author"
                        width={485}
                        height={650}
                        loading="eager"
                    />
                </div>
            </div>
        </motion.div>
    )
}
