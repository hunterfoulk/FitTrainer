
import React, { useState } from 'react'
import styles from "../../../styles/Navbar.module.scss"
import Image from 'next/image'
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import { AiOutlineFacebook } from 'react-icons/ai';
import { FiTwitter } from 'react-icons/fi';
interface Props {

}

const DashboardNav: React.FC<Props> = ({ }) => {

    const runFunc = () => {
        window.location.href = "/"
    }

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.navbar_left}>
                    <Image alt="Vercel logo" src="/images/weightslogoorange.png" width={25} height={28} quality={100} className="avatar" />

                    <Link href='/' >
                        <span>FitTrainer</span>
                    </Link>

                </div>
                <div className={styles.navbar_right} >
                    <div className={styles.navbar_right_routes}>

                        <ul>
                            <li>
                                <span>Features</span>
                                <ul>
                                    <li><a href="#">Option1</a></li>
                                    <li><a href="#">Option2 yo</a></li>
                                    <li><a href="#">Option3</a></li>
                                </ul>
                            </li>
                            <li>
                                <span>Community</span>
                                <ul>
                                    <li><a href="#">Option1</a></li>
                                    <li><a href="#">Option2 hey</a></li>
                                    <li><a href="#">Option3</a></li>
                                </ul>
                            </li>
                            <li>
                                <span>Pricing</span>
                                <ul>
                                    <li><a href="#">Option1</a></li>
                                    <li><a href="#">Option2 hi</a></li>
                                    <li><a href="#">Option3</a></li>
                                </ul>
                            </li>

                        </ul>

                    </div>
                    <div className={styles.navbar_right_links}>
                        <span> <AiOutlineFacebook /></span>
                        <span> <FiTwitter /></span>
                        <span> <FaInstagram /></span>
                    </div>
                    <div className={styles.navbar_right_button_container}>
                        <Link href='/dashboard' >

                            <button className={styles.dashboard_button}>Dashboard</button>
                        </Link>
                    </div>

                </div>

            </div>
        </>
    )
}

export default DashboardNav