import React, { useState, useEffect } from 'react'
import styles from "../../../styles/Navbar.module.scss"
import Image from 'next/image'
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import { AiOutlineFacebook } from 'react-icons/ai';
import { FiTwitter } from 'react-icons/fi';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
interface Props {

}

const Navbar: React.FC<Props> = ({ }) => {
    const [loginHovering, setLoginHovering] = useState(false)
    const [signupHovering, setSignupHovering] = useState(false)
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
            }} className="navbar flex w-full max-w-[1500px] flex justify-center items-center py-4 px-2">
            <div className="flex w-full max-w-[1500px] py-1">
                <div className="w-auto flex items-center py-1">
                    <div className="h-full relative px-5 ">
                        <Image alt="Vercel logo" src="/images/weightslogocrimson.png" layout='fill'
                            objectFit="contain" loading="eager" className="avatar" />
                    </div>
                    <div className=" h-full flex items-center">
                        <Link href='/' >
                            <span className="mx-1 text-white text-[22px] font-bold">FitTrainer</span>
                        </Link>
                    </div>
                    <div className="flex items-center h-full px-6">

                        <li className="cursor-pointer inline mx-6 text-white text-md list-none text-[grey] text-[16px]">About</li>
                        <li className="cursor-pointer inline mx-6 text-white text-md list-none text-[grey] text-[16px]">Features</li>
                        <li className="cursor-pointer inline mx-6 text-white text-md list-none text-[grey] text-[16px]">Contact</li>
                        <li className="cursor-pointer inline mx-6 text-white text-md list-none text-[grey] text-[16px]">Pro</li>

                    </div>

                </div>
                <div className="flex flex-1 justify-end py-1">

                    <div className="flex rounded-sm text-white" style={{ backgroundColor: "#3535359a" }}>
                        <Link href='/login' >

                            <div className="cursor-pointer text-md py-1.5 flex items-center justify-center" onMouseEnter={() => setLoginHovering(true)} onMouseLeave={() => setLoginHovering(false)} style={loginHovering ? { backgroundColor: "#4e4e4e9a" } : null}>
                                <span className="border-r border-white w-full px-5 h-full py-1">
                                    Login

                                </span>
                            </div>

                        </Link>
                        <Link href='/signup' >

                            <div className="cursor-pointer text-md flex py-1.5 items-center justify-center" onMouseEnter={() => setSignupHovering(true)} onMouseLeave={() => setSignupHovering(false)} style={signupHovering ? { backgroundColor: "#4e4e4e9a" } : null}>
                                <span className="px-5 h-full py-1">

                                    Sign Up
                                </span>
                            </div>

                        </Link>
                    </div>

                </div>
            </div>
        </motion.div>
    )
}
export default Navbar
{/* <style jsx global>{`
    .avatar {
      margin-top:5px;

    }
  `}</style> */}