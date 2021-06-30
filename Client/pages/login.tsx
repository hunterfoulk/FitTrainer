import styles from "../styles/Login.module.scss"
import React, { useState, useEffect } from 'react'
import Navbar from "../components/landing/navbar/navbar"
import Image from 'next/image'
import Link from 'next/link';
import Router from "next/router";


interface Props {

}

const Login: React.FC<Props> = ({ }) => {
    const [form, setForm] = useState({
        email: 'huntertehjakey@hotmail.com',
        password: 'password'
    })
    const [tab, setTab] = useState("Gym")

    useEffect(() => {
        fetch('http://localhost:9000/logout', {
            method: 'get',
            credentials: 'include'
        });
    }, [])

    async function Log(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()

        const res = await fetch('http://localhost:9000/trainerLogin', {
            method: 'POST',
            'credentials': 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: form.email, password: form.password }),
        })

        const { data, status } = await res.json()
        console.log("data", data)
        switch (status) {
            case 503:
                console.log('Database Error.')
                break;
            case 400: // No Account
                console.log('Trainer Account Not Found.')
                setForm(form => {
                    return {
                        ...form,
                        email: '',
                        password: ''
                    }
                })
                break;
            case 401: // Incorrect Password
                console.log('Incorrect Password')
                setForm(form => {
                    return {
                        ...form,
                        password: ''
                    }
                })
                break;
            case 200: // Authenticated
                window.location.href = "/schedule"
                Router.push("/schedule")
                break;
            default:
                break;
        }
    }

    return (
        <>
            <body>
                <div
                    className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
                >
                    <div
                        className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-[500px]"
                    >
                        <h1 className="text-center text-5xl font-light">FitTrainer</h1>
                        <div className="mt-10">
                            <form id="form" onSubmit={(e) => Log(e)}>
                                <div className="flex flex-col mb-6">
                                    <label
                                        htmlFor="email"
                                        className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                                    >
                                        Email:
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                                        >
                                            <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus: border-blue-400"
                                            placeholder="Email"
                                            value={form.email}
                                            onChange={(e) => {
                                                setForm({ ...form, email: e.target.value })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="password"
                                        className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                                    >
                                        Password:
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                                        >
                                            <span>
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                    />
                                                </svg>
                                            </span>
                                        </div>

                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                            placeholder="Password"
                                            value={form.password}
                                            onChange={(e) => {
                                                setForm({ ...form, password: e.target.value })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full my-3">
                                    <span className="hover:underline cursor-pointer mr-1">Dont have an account?</span>

                                    <Link href="/signup">
                                        <a className="text-indigo-600 hover:underline cursor-pointer">Sign up</a>

                                    </Link>
                                </div>
                                <div className="flex w-full">
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-[#cf2121] hover:bg-[#c2041b] rounded py-2 w-full transition duration-150 ease-in"
                                    >
                                        <span className="mr-2 uppercase">Login</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </body>
        </>
    )
}

export default Login
