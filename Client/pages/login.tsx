import styles from "../styles/Login.module.scss"
import React, { useState } from 'react'
import Navbar from "../components/landing/navbar/navbar"
import Image from 'next/image'
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { authTrue, authFalse } from "../redux/authSlice"
import Router from "next/router";


interface Props {

}

const Login: React.FC<Props> = ({ }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state: any) => state.auth);
    const [form, setForm] = useState({
        email: 'huntsgym@gym.com',
        password: 'password'
    })
    const [tab, setTab] = useState("Gym")


    async function Log(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()

        const res = await fetch(tab === "Gym" ? 'http://localhost:9000/gymLogin' : 'http://localhost:9000/trainerLogin', {
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
                dispatch(authTrue())
                // window.location.href = "/dashboard"
                // Router.push("/dashboard")
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className={styles.login_main}>
                <div className={styles.login_content_container}>

                    <div className={styles.login_left}>
                        <Image alt="Vercel logo" src="/images/signupsmallpng.png" width={100} height={100} quality={100} className="avatar" />
                    </div>
                    <div className={styles.login_right}>
                        <div className={styles.login_tab_header}>
                            <div className={tab === "Gym" ? styles.activeTab : styles.defaultTab} onClick={() => setTab("Gym")}>Gym</div>
                            <div className={tab === "Trainer" ? styles.activeTab : styles.defaultTab} onClick={() => setTab("Trainer")}>Trainer</div>
                        </div>
                        <div className={styles.login_right_header}>

                            <div className={styles.login_right_image_container}>
                                <Image alt="Vercel logo" src="/images/weightslogocrimson.png" width={100} height={100} quality={100} className="avatar" />
                            </div>
                            <div className={styles.login_right_text_container}>
                                <span>FitTrainer</span>
                            </div>
                            <div className={styles.login_right_second_text_container}>
                                {tab === "Gym" ? <span>Log in to your gyms account.</span> : <span>Log in to your trainer account.</span>}
                            </div>
                        </div>
                        <div className={styles.login_form_container}>
                            <form onSubmit={(e) => Log(e)}>
                                <input
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={(e) => {
                                        setForm({ ...form, email: e.target.value })
                                    }} />
                                <input
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={(e) => {
                                        setForm({ ...form, password: e.target.value })
                                    }} />
                                <div className={styles.login_button_container}>
                                    <button type="submit">Log In</button>
                                </div>
                            </form>
                            <div className={styles.login_login_text_container}>
                                {tab === "Gym" ? <Link href="/signup">
                                    <span>Dont have an account?</span>
                                </Link> : null}

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login
