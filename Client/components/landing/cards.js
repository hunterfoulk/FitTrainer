import React from 'react'

export default function Cards() {
    return (
        <div className="flex w-full justify-center mt-[120px] py-5 max-w-[1500px] mb-[80px]">
            <div className="flex w-full flex justify-around h-full flex-wrap features:justify-between">

                <div className="bg-[#3b3b3b9a] text-[#F5F5F5] mx-3 min-w-[400px] max-w-[400px] flex-col rounded-b-md rounded-t-md mb-8">
                    <div>
                        <p className="flex-1 py-5 px-7 ">
                            "I love the clean look and feel to the app! Very easy to navigate and fun to use. I give it a thumbs up."
                    </p>
                    </div>

                    <div className=" flex-1 py-3 px-7 flex flex-row">
                        <div className="h-[40px] w-[40px] ">
                            <img className="h-full w-full rounded-full" src="/images/wes.jpg" />
                        </div>
                        <div className="flex flex-col px-3">
                            <span className="font-bold">Wes Budge</span>
                            <span className="text-[#808080]">Chandler, Arizona</span>
                        </div>

                    </div>
                </div>

                <div className="bg-[#3b3b3b9a] text-[#F5F5F5] mx-3 min-w-[400px] max-w-[400px] flex-col rounded-b-md rounded-t-md mb-8">
                    <div>
                        <p className="flex-1 py-5 px-7 ">
                            "I love the clean look and feel to the app! Very easy to navigate and fun to use. I give it a thumbs up."
                    </p>
                    </div>

                    <div className="flex-1 py-3 px-7 flex flex-row">
                        <div className="h-[40px] w-[40px] ">
                            <img className="h-full w-full rounded-full" src="/images/brielle.jpg" />
                        </div>
                        <div className="flex flex-col px-3">
                            <span className="font-bold">Brielle Schumpe</span>
                            <span className="text-[#808080]">Phoenix, Arizona</span>
                        </div>

                    </div>
                </div>

                <div className="bg-[#3b3b3b9a] text-[#F5F5F5] mx-3 min-w-[400px] max-w-[400px] flex-col rounded-b-md rounded-t-md mb-8">
                    <div>
                        <p className="flex-1 py-5 px-7 ">
                            "I love the clean look and feel to the app! Very easy to navigate and fun to use. I give it a thumbs up."
                    </p>
                    </div>

                    <div className="flex-1 py-3 px-7 flex flex-row ">
                        <div className="h-[40px] w-[40px] ">
                            <img className="h-full w-full rounded-full" src="/images/justin.jpg" />
                        </div>
                        <div className="flex flex-col px-3">
                            <span className="font-bold">Coach Justin</span>
                            <span className="text-[#808080]">Phoenix, Arizona</span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
