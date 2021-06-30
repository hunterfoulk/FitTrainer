import React from 'react'
import Image from 'next/image'

export default function GetStarted() {
    return (
        <div className="flex-col started:flex flex-row w-full mt-[140px] p-5 max-w-[1500px]">
            <div className="flex-1 flex justify-center mb-[30px] started:justify-start flex-1 px-2">
                <div >
                    <Image
                        src="/images/girlpic.jpg"
                        alt="Picture of the author"
                        width={450}
                        height={650}
                        loading="eager"
                    />
                </div>
            </div>
            <div className="flex flex-col w-full max-w-[100%] items-center started:max-w-[100%] flex flex-col flex-1 items-end px-2 py-10 ">
                <div className="flex flex-col w-full  max-w-[100%] started:max-w-[90%] flex flex-col lg:max-w-[80%] text-right">
                    <span className="mb-3 text-[#F5F5F5] text-4xl font-bold text-center started:text-right">
                        Ready to get started? Find out which plan is best for you.
                    </span>
                    <div className="flex justify-center started:justify-end mt-3">
                        <button className="text-[#F5F5F5] bg-[#cf2121] text-lg font-bold p-2 min-w-[140px] rounded-[3px] ">Get Started</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
