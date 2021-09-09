import React, { useEffect } from 'react'
import { IoMdCheckbox } from 'react-icons/io';
import Image from 'next/image'
// import myImg from "../../public/images/qualitative-research.PNG"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Features() {
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
            }} className="flex flex-col py-14 items-center features:flex-row w-full max-w-[1500px] justify-center mt-[160px] mb-[160px] ">


            <div className="flex flex-1 flex-col items-center features:items-start">
                <div className="w-full max-w-[700px] py-3 mb-4 text-center features:text-left max-w-[600px] ">
                    <span className=" text-[#F5F5F5] t text-4xl font-Roboto font-bold ">
                        <span className="text-[#cf2121] ">Apex's</span> Training Software is designed for trainers who want to easily track clients progress and their training goals
                    </span>
                </div>

                <div className="text-lg flex items-stretch w-full justify-center max-w-[500px] py-3 features:justify-start mb-[0px]">



                    <div className="flex flex-col m-2 ">

                        <div className="flex flex-row w-auto items-center mb-2">

                            <IoMdCheckbox className="text-[#575757] mx-3" />
                            <span className="text-[#F5F5F5]"> Weekly and Daily Scheduler</span>

                        </div>


                        <div className="flex flex-row w-auto items-center mb-2">
                            <IoMdCheckbox className="text-[#575757] mx-3" />
                            <span className="text-[#F5F5F5]">Always stay up to date</span>

                        </div>

                        <div className="flex flex-row w-auto items-center mb-2">
                            <IoMdCheckbox className="text-[#575757] mx-3" />
                            <span className="text-[#F5F5F5]">Improve training experience</span>

                        </div>

                        <div className="flex flex-row w-auto items-center mb-2">
                            <IoMdCheckbox className="text-[#575757] mx-3" />
                            <span className="text-[#F5F5F5]">Use on any device</span>

                        </div>
                    </div>


                </div>

            </div>




            <div className="flex flex-1 flex-wrap w-auto mt-[150px] justify-center features:mt-0">

                <div className=" min-w-[50%] mb-4 md:mb-0">
                    <div className="flex-basis flex-col flex-1 min-w-[300px] m-auto max-w-[300px] mb-10 ">
                        <div className="py-1 mb-2 flex justify-center py-1 650:justify-start">
                            <img className="h-[50px] w-[50px]" src="/images/qualitative-research.png" />
                        </div>
                        <div className="py-1">
                            <span className="text-[#F5F5F5] text-lg font-bold flex justify-center py-1 650:justify-start">Simple client creation</span>
                        </div>
                        <div className="py-1 text-[#7c7c7c] flex justify-center py-1 650:justify-start">
                            Create a profile for your client with customizble features.
                        </div>
                    </div>
                </div>

                <div className="min-w-[50%] mb-4 md:mb-0">
                    <div className="flex-basis flex-col flex-1 m-auto min-w-[300px] max-w-[300px] mb-10">
                        <div className="flex justify-center py-1 mb-2 650:justify-start">
                            <img className="h-[50px] w-[50px]" src="/images/line-chart.png" />

                        </div>
                        <div className="flex justify-center py-1 650:justify-start">
                            <span className="text-[#F5F5F5] text-lg font-bold">Detailed progress tracking</span>
                        </div>
                        <div className="py-1 text-[#7c7c7c] flex justify-center py-1 650:justify-start">
                            Track your clients goals and completed workouts easily.
                        </div>
                    </div>
                </div>

                <div className="mb-4 min-w-[50%] md:mb-0">
                    <div className="flex-basis flex-col flex-1 m-auto min-w-[300px] max-w-[300px] mb-10">
                        <div className="py-1 mb-2 flex justify-center py-1 650:justify-start">
                            <img className="h-[50px] w-[50px] " src="/images/calendar.png" />

                        </div>
                        <div className="py-1 flex justify-center py-1 650:justify-start">
                            <span className="text-[#F5F5F5] text-lg font-bold" >Trainer training scheduling</span>
                        </div >
                        <div className="py-1 text-[#7c7c7c] flex justify-center py-1 650:justify-start">
                            Easy to use scheduler to create and keep up with daily, weekly and monthly appointments.
                        </div>
                    </div>
                </div>

                <div className="mb-4 min-w-[50%] md:mb-0">

                    <div className="flex-basis flex-col flex-1 m-auto min-w-[300px] max-w-[300px] mb-10">
                        <div className="py-1 mb-2 flex justify-center py-1 650:justify-start">
                            <img className="h-[50px] w-[50px]" src="/images/call-center.png" />

                        </div>
                        <div className="py-1 flex justify-center py-1 650:justify-start">
                            <span className="text-[#F5F5F5] text-lg font-bold">Large exercises database</span>
                        </div>
                        <div className="py-1 text-[#7c7c7c] flex justify-center py-1 650:justify-start">
                            <span>Over 200 exercises to add to your created workouts.</span>
                        </div>
                    </div>
                </div>

            </div>



        </motion.div >
    )
}
