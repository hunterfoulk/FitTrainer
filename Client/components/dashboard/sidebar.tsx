import React, { useState } from 'react';
import styles from "../../styles/dashboard/Sidebar.module.scss";
import Link from 'next/link';
import Router from "next/router"
import Image from 'next/image';
import { FiCalendar } from 'react-icons/fi';
import { MdPersonOutline } from 'react-icons/md';
import { FiPaperclip } from 'react-icons/fi';
import { FaReply } from 'react-icons/fa';
import { FaRegCreditCard } from 'react-icons/fa';


interface Props {
    setTabG: any,
    tabG: string
}


const MyButton = React.forwardRef(({ onClick, href }: any, ref: any) => {
    return (
        <a href={href} onClick={onClick} ref={ref}>
            <Image alt="Vercel logo" src="/images/weightslogoorange.png" width={25} height={28} quality={100} />
            <span>FitTrainer</span>
        </a>
    )
})


const Sidebar: React.FC<Props> = ({ setTabG, tabG }) => {



    const logout = async () => {

        await fetch('http://localhost:9000/logout', {
            method: 'get',
            credentials: 'include'
        });
        window.localStorage.removeItem('_ftTrainerAuth')
        Router.push("/")
    }


    return (
        <>
            <div className={styles.sidebar}>
                <div className={styles.sidebar_header}>

                    <Link href="/" passHref>
                        <MyButton />
                    </Link>


                </div>
                <div className={styles.sidebar_tabs_container}>

                    <div onClick={() => setTabG("Trainers")} className={tabG === "Trainers" ? styles.sidebar_tab_active : styles.sidebar_tab_unactive}>
                        <div className={styles.sidebar_tab_content}>
                            <div>

                                <MdPersonOutline />
                            </div>
                            <div>

                                <span>Trainers</span>
                            </div>
                        </div>

                    </div>

                    <div onClick={() => setTabG("Recents")} className={tabG === "Recents" ? styles.sidebar_tab_active : styles.sidebar_tab_unactive} >
                        <div className={styles.sidebar_tab_content}>
                            <div>

                                <FaReply />
                            </div>
                            <div>

                                <span>Recents</span>
                            </div>
                        </div>

                    </div>
                    <div onClick={() => setTabG("Subscriptions")} className={tabG === "Subscriptions" ? styles.sidebar_tab_active : styles.sidebar_tab_unactive}>
                        <div className={styles.sidebar_tab_content}>
                            <div>
                                <FaRegCreditCard />

                            </div>
                            <div>

                                <span>Subscription</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={styles.sidebar_logout_container}>
                    <button onClick={logout}>Log out</button>

                </div>

            </div>
        </>
    )
}

export default Sidebar