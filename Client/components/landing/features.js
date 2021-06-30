import React from 'react'
import { IoMdCheckbox } from 'react-icons/io';
import Image from 'next/image'
// import myImg from "../../public/images/qualitative-research.PNG"

export default function Features() {
    return (
        <div className="flex flex-col items-center features:flex-row w-full max-w-[1500px] justify-center mt-[120px] mb-[100px] ">


            <div className="flex flex-1 flex-col items-center features:items-start">
                <div className="w-full max-w-[700px] py-3 mb-4 text-center features:text-left max-w-[600px] ">
                    <span className=" text-[#F5F5F5] t text-4xl font-Roboto font-bold">
                        <span className="text-[#cf2121] ">FitTrainer</span> is designed for trainers who want to easily track clients progress and their training goals
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




                    {/* <div className="flex items-center justify-center w-[100%] md:w-[50%] justify-start">
                            <IoMdCheckbox className="text-[#575757] mx-3" />
                            <span className="text-[#F5F5F5]">Improve training experience</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-[100%] md:w-[50%] justify-start">
                        <IoMdCheckbox className="text-[#575757] mx-3" />
                        <span className="text-[#F5F5F5]">Use on any device</span>
                    </div> */}

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
                            heyyy sedgas asdgasd asg afgaefas astasetq asev setq asev asdfaset asef asdfqaset asdv a
                        </div>
                    </div>
                </div>

                <div className="min-w-[50%] mb-4 md:mb-0">
                    <div className="flex-basis flex-col flex-1 m-auto min-w-[300px] max-w-[300px] mb-10">
                        <div className="flex justify-center py-1 mb-2 650:justify-start">
                            <img className="h-[50px] w-[50px]" src="/images/qualitative-research.png" />

                        </div>
                        <div className="flex justify-center py-1 650:justify-start">
                            <span className="text-[#F5F5F5] text-lg font-bold">Detailed progress tracking</span>
                        </div>
                        <div className="py-1 text-[#7c7c7c] flex justify-center py-1 650:justify-start">
                            heyyy sedgas asdgasd asg afgaefas astasetq asev setq asev asdfaset asef asdfqaset asdv a
                        </div>
                    </div>
                </div>

                <div className="mb-4 min-w-[50%] md:mb-0">
                    <div className="flex-basis flex-col flex-1 m-auto min-w-[300px] max-w-[300px] mb-10">
                        <div className="py-1 mb-2 flex justify-center py-1 650:justify-start">
                            <img className="h-[50px] w-[50px] " src="/images/calendar.png" />

                        </div>
                        <div className="py-1 flex justify-center py-1 650:justify-start">
                            <span className="text-[#F5F5F5] text-lg font-bold" >Client training scheduling</span>
                        </div >
                        <div className="py-1 text-[#7c7c7c] flex justify-center py-1 650:justify-start">
                            heyyy sedgas asdgasd asg afgaefas astasetq asev setq asev asdfaset asef asdfqaset asdv a
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
                            <span> heyyy sedgas asdgasd asg afgaefas astasetq asev setq asev asdfaset asef asdfqaset asdv a</span>
                        </div>
                    </div>
                </div>

            </div>



        </div >
    )
}
