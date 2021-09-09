import React, { useState, useEffect } from 'react'
import styles from "../../../styles/Navbar.module.scss"
import Image from 'next/image'
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import { AiOutlineFacebook } from 'react-icons/ai';
import { FiTwitter } from 'react-icons/fi';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Menu from "./menu"


const MobileNav = ({ }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView();
    const [toggleMenu, setToggleMenu] = useState(false)
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <>
            {toggleMenu ? <Menu /> : null}
            <div className="flex w-full max-w-[1500px] py-4 relative">
                <div className="w-auto flex items-center justify-center py-1">
                    <div className="relative px-5 w-[160px] py-5 h-full">

                        <Image alt="Vercel logo" src="/images/whiteapexlogo.png" layout='fill' objectFit="contain" loading="eager" quality={100} />
                    </div>


                </div>
                <div className="flex flex-1 justify-end items-center py-1">

                    {toggleMenu ? <CloseIcon className="text-white h-[70px] w-[70px] cursor-pointer" onClick={() => setToggleMenu(false)} /> : <MenuIcon className="text-white h-[70px] w-[70px] cursor-pointer" onClick={() => setToggleMenu(true)} />}
                </div>

            </div>
        </>
    )
}



const Navbar = ({ }) => {
    const [loginHovering, setLoginHovering] = useState(false)
    const [signupHovering, setSignupHovering] = useState(false)
    const controls = useAnimation();
    const [ref, inView] = useInView();

    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }


    }, [controls, inView]);



    useEffect(() => {
        if (window.innerWidth < 750) {
            setMobile(true)
        }
    }, [])
    return (
        <motion.div ref={ref}
            animate={controls}
            initial="hidden"
            transition={{ duration: 0.4 }}
            variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 1 }
            }} className="navbar flex w-full max-w-[1500px] flex justify-center items-center py-4 px-2">
            {
                mobile ? <MobileNav /> :

                    <div className="flex w-full max-w-[1500px] py-1">
                        <div className="w-auto flex items-center py-1">
                            <div className="h-full relative px-5 w-[120px] ">

                                <Image alt="Vercel logo" src="/images/whiteapexlogo.png" layout='fill' objectFit="contain" loading="eager" quality={100} />
                            </div>

                            <div className="flex items-center h-full px-6">

                                <li className="cursor-pointer inline mx-6 text-white text-md list-none text-[16px] hover:underline">About</li>
                                <li className="cursor-pointer inline mx-6 text-white text-md list-none text-[16px] hover:underline">Features</li>
                                <li className="cursor-pointer inline mx-6 text-white text-md list-none text-[16px] hover:underline">Contact</li>


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
            }
        </motion.div>
    )
}
export default Navbar
