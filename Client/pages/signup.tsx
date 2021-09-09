import styles from "../styles/Signup.module.scss"
import React, { useState } from 'react'
import Navbar from "../components/landing/navbar/navbar"
import Image from 'next/image'
import Link from 'next/link';
import { FaRegPaperPlane } from 'react-icons/fa';
import { FaRegEnvelope } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { MdPersonOutline } from 'react-icons/md';
import { FaStarOfLife } from 'react-icons/fa';






const Signup = ({ }) => {

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: ""
    })

    async function Register(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        const res = await fetch('http://localhost:9000/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: form.firstName,
                    lastname: form.lastName,
                    email: form.email,
                    phone: form.phone,
                    password: form.password
                }),
            }
        )
        let data = await res.json()
        console.log(data)


        switch (data.status) {
            case 409: // User Already Exists
                setForm({

                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    password: ""

                })
                break;
            case 200: // Account Created
                // auto log functionality
                setForm({

                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    password: ""

                })
                break;
            default:
                break;
        }
    }

    return (
        <>


            <div className="signup-1 flex items-center relative h-screen ">
                <div className="overlay absolute inset-0 z-0 bg-[#0a0a0a]"></div>
                <div className="container px-4 mx-auto relative z-10 ">
                    <div className="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto border border-gray-200">
                        <div className="box bg-transparent p-6 md:px-12 md:pt-12 shadow-lg">
                            <div className="flex w-full justify-center">

                                <img className="text-center h-[70px] w-[220px]" src="/images/whiteapexlogo.png" />
                            </div>
                            {/* <h2 className="text-3xl text-white text-center">Create Your Account</h2> */}

                            <div className="signup-form mt-6 md:mt-12">

                                <div className="border-2 border-solid rounded flex items-center mb-4">
                                    <div className="w-10 h-10 flex justify-center items-center flex-shrink-0">
                                        <span className="far fa-user text-white"><MdPersonOutline /></span>
                                    </div>
                                    <div className="flex-1">
                                        <input type="text" placeholder="First Name" className="bg-transparent text-white h-10 py-1 pr-3 w-full focus:outline-none" value={form.firstName}
                                            onChange={(e) => {
                                                setForm({ ...form, firstName: e.target.value })
                                            }} />
                                    </div>
                                </div>

                                <div className="border-2 border-solid rounded flex items-center mb-4">
                                    <div className="w-10 h-10 flex justify-center items-center flex-shrink-0">
                                        <span className="far fa-user text-white"><MdPersonOutline /></span>
                                    </div>
                                    <div className="flex-1">
                                        <input type="text" placeholder="Last Name" className=" bg-transparent text-white h-10 py-1 pr-3 w-full focus:outline-none " value={form.lastName}
                                            onChange={(e) => {
                                                setForm({ ...form, lastName: e.target.value })
                                            }} />
                                    </div>
                                </div>

                                <div className="border-2 border-solid rounded flex items-center mb-4">
                                    <div className="w-10 h-10 flex justify-center items-center flex-shrink-0">
                                        <span className="far fa-envelope text-white"><FaRegEnvelope /></span>
                                    </div>
                                    <div className="flex-1">
                                        <input type="text" placeholder="Email" className=" bg-transparent text-white h-10 py-1 pr-3 w-full  focus:outline-none " value={form.email}
                                            onChange={(e) => {
                                                setForm({ ...form, email: e.target.value })
                                            }} />
                                    </div>
                                </div>

                                <div className="border-2 bg-transparent border-solid rounded flex items-center mb-4">
                                    <div className="w-10 h-10 flex justify-center items-center flex-shrink-0">
                                        <span className="far fa-user text-white"><FiPhone /></span>
                                    </div>
                                    <div className="flex-1">
                                        <input type="text" placeholder="Phone" className="bg-transparent text-white h-10 py-1 pr-3 w-full focus:outline-none " value={form.phone}
                                            onChange={(e) => {
                                                setForm({ ...form, phone: e.target.value })
                                            }} />
                                    </div>
                                </div>

                                <div className="border-2 border-solid rounded flex items-center mb-4">
                                    <div className="w-10 h-10 flex justify-center items-center flex-shrink-0 ">
                                        <span className="fas fa-asterisk text-white"><FaStarOfLife /></span>
                                    </div>
                                    <div className="flex-1">
                                        <input type="password" placeholder="Password" className="bg-transparent text-white h-10 py-1 pr-3 w-full focus:outline-none focus:border-blue-400" value={form.password}
                                            onChange={(e) => {
                                                setForm({ ...form, password: e.target.value })
                                            }} />
                                    </div>
                                </div>

                                <p className="text-sm text-white text-center mt-6">By signing up, you agree to our <a href="#" className="text-indigo-600 hover:underline">Terms</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a></p>

                                <div className="flex justify-center text-center mt-6 md:mt-12">
                                    <button onClick={(e: any) => Register(e)} className="bg-[#ea2537] flex flex-row items-center hover:bg-[#c2041b] text-white text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300">Sign Up <span className="far fa-paper-plane ml-2"><FaRegPaperPlane /></span></button>
                                </div>

                            </div>

                            <div className="border-t flex justify-center border-solid mt-6 md:mt-12 pt-4">
                                <p className="text-white text-center mr-1">Already have an account,</p>
                                <Link href="/login">
                                    <a className="text-indigo-600 hover:underline cursor-pointer">Sign In</a>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>


    )
}


export default Signup;