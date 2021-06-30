import React from 'react'
import styles from "../../styles/Header.module.scss"
import Image from 'next/image'
import Link from 'next/link';
import { MdPlayArrow } from 'react-icons/md';

export default function Header() {



    return (
        <>
            <div className="w-full flex justify-center items-center max-w-[1500px] py-[120px] ">
                <div className="w-full flex-col flex mt-5 lg:flex-row">
                    <div className="flex py-6 items-center mb-4 justify-center lg:mb-0 ">
                        <div className=" flex flex-col items-center w-[100%] max-w-full lg:items-start">
                            <div className="text-lg text-[#F5F5F5] text-center py-5 text-[#808080] lg:text-left">
                                <h1>GET MORE BENEFIT BY JOINING THE PRO VERSION</h1>
                            </div>
                            <div className="text-5xl font-bold text-center flex py-5 text-[#F5F5F5] lg:text-left">
                                <p>The Ultimate Online Training Software</p>
                            </div>
                            <div className="text-lg font-bold text-center flex py-5 text-[#ea2537] lg:text-left">
                                <p>Coming soon to</p>
                            </div>
                            <div className="flex w-full flex-row items-center mb-5 ">

                                <img src="/images/googleplay.png" className="max-h-[46px] w-[153px]" />
                                <img src="/images/appstore1.png" className="max-h-[46px] w-[152px] ml-5" />

                            </div>
                        </div>
                    </div>
                    <div className="flex w-full relative justify-end min-h-[450px] w-full lg:min-h-[500px] ">
                        {/* <img alt="Vercel logo" src="/images/headersvg.png" className="" /> */}
                        <Image alt="Vercel logo" src="/images/header123.png" layout='fill' objectFit="contain" />
                    </div>
                </div>
            </div>
        </>

    )
}
