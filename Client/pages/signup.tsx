import styles from "../styles/Signup.module.scss"
import React, { useState } from 'react'
import Navbar from "../components/landing/navbar/navbar"
import Image from 'next/image'
import Link from 'next/link';

interface Props { }

const Signup: React.FC<Props> = ({ }) => {

    const [form, setForm] = useState({
        email: 'trainer1@gym.com',
        password: 'password'
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
                    email: form.email,
                    password: form.password
                }),
            }
        )
        let data = await res.json()
        console.log(data)

        setForm(form => {
            return {
                ...form,
                title: data.message
            }
        })
        switch (data.status) {
            case 409: // User Already Exists
                setForm(form => {
                    return {
                        ...form,
                        email: '',
                        password: '',
                        submitting: false
                    }
                })
                break;
            case 200: // Account Created
                // auto log functionality
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className={styles.signup_main}>
                <div className={styles.signup_content_container}>

                    <div className={styles.signup_left}>
                        <Image alt="Vercel logo" src="/images/signupsmallpng.png" width={100} height={100} quality={100} className="avatar" />

                    </div>
                    <div className={styles.signup_right}>
                        <div className={styles.signup_right_header}>
                            <div className={styles.signup_right_image_container}>
                                <Link href="/">
                                    <Image alt="Vercel logo" src="/images/weightslogoorange.png" width={100} height={100} quality={100} className="avatar" />
                                </Link>
                            </div>
                            <div className={styles.signup_right_text_container}>
                                <span>FitTrainer</span>
                            </div>
                            <div className={styles.signup_right_second_text_container}>
                                <span>Create Free Account</span>
                            </div>
                        </div>
                        <div className={styles.signup_form_container}>
                            <form onSubmit={(e) => Register(e)}>
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
                                <div className={styles.signup_button_container}>
                                    <button type="submit">Get Started</button>
                                </div>
                            </form>
                            <div className={styles.signup_login_text_container}>
                                <Link href="/login">
                                    <span>Already have an account?</span>
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