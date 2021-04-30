import React, { useState } from 'react';
import styles from "../../styles/dashboard/Sidebar.module.scss";
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar } from 'react-icons/fi';
import { MdPersonOutline } from 'react-icons/md';
import { FiPaperclip } from 'react-icons/fi';
import { FiHome } from 'react-icons/fi';
import { FaReply } from 'react-icons/fa';
import { AiOutlineBarChart } from 'react-icons/ai';

import { FaRegCreditCard } from 'react-icons/fa';
import Router from "next/router"


interface Props {
    setTabT: any,
    tabT: string
}


const MyButton = React.forwardRef(({ onClick, href }: any, ref: any) => {
    return (
        <a href={href} onClick={onClick} ref={ref}>
            <Image alt="Vercel logo" src="/images/weightslogocrimson.png" width={25} height={28} quality={100} />
            <span>FitTrainer</span>
        </a>
    )
})
const logout = async () => {

    await fetch('http://localhost:9000/logout', {
        method: 'get',
        credentials: 'include'
    });
    window.localStorage.removeItem('_ftTrainerAuth')
    Router.push("/")
}



const trainerSidebar: React.FC<Props> = ({ setTabT, tabT }) => {

    console.log(window.location.href, "HREFFF")
    return (
        <>
            <div className={styles.sidebar}>
                <div className={styles.sidebar_header}>

                    <Link href="/" passHref>
                        <MyButton />
                    </Link>


                </div>
                <div className={styles.sidebar_tabs_container}>
                    <Link href="/dashboard">
                        <div onClick={() => setTabT("Home")} className={window.location.href === "http://localhost:3000/dashboard" ? styles.sidebar_tab_active : styles.sidebar_tab_unactive}>
                            <div className={styles.sidebar_tab_content}>
                                <div>

                                    <FiHome />
                                </div>

                                <div>
                                    <span>Home</span>

                                </div>
                            </div>

                        </div>
                    </Link>
                    <Link href="/schedule" >
                        <div onClick={() => setTabT("Schedule")} className={window.location.href === "http://localhost:3000/schedule" ? styles.sidebar_tab_active : styles.sidebar_tab_unactive}>
                            <div className={styles.sidebar_tab_content}>
                                <div>

                                    <FiCalendar />
                                </div>

                                <div>
                                    <span>Schedule</span>

                                </div>
                            </div>

                        </div>
                    </Link>
                    <div onClick={() => setTabT("Clients")} className={tabT === "Clients" ? styles.sidebar_tab_active : styles.sidebar_tab_unactive}>
                        <div className={styles.sidebar_tab_content}>
                            <div>

                                <MdPersonOutline />
                            </div>
                            <div>

                                <span>Clients</span>
                            </div>
                        </div>

                    </div>

                    <Link href="/programs" >
                        <div onClick={() => setTabT("Programs")} className={window.location.href === "http://localhost:3000/programs" ? styles.sidebar_tab_active : styles.sidebar_tab_unactive}>
                            <div className={styles.sidebar_tab_content}>
                                <div >
                                    <FiPaperclip />

                                </div>
                                <div>
                                    <span>Programs</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div onClick={() => setTabT("Recents")} className={tabT === "Recents" ? styles.sidebar_tab_active : styles.sidebar_tab_unactive}>
                        <div className={styles.sidebar_tab_content}>
                            <div>

                                <FaReply />
                            </div>
                            <div>

                                <span>Recents</span>
                            </div>
                        </div>

                    </div>
                    <div onClick={() => setTabT("Metrics")} className={tabT === "Metrics" ? styles.sidebar_tab_active : styles.sidebar_tab_unactive}>
                        <div className={styles.sidebar_tab_content}>
                            <div>

                                <AiOutlineBarChart />
                            </div>
                            <div>

                                <span>Metrics</span>
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

export default trainerSidebar