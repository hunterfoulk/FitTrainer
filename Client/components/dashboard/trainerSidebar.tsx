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
import { CgProfile } from 'react-icons/cg';

import Router from "next/router"

interface Props {
    setTabT: any,
    tabT: string
}


const MyButton = React.forwardRef(({ onClick, href }: any, ref: any) => {
    return (
        <a href={href} onClick={onClick} ref={ref}>
            <Image alt="Vercel logo" src="/images/blackapexlogo.png" width={130} height={50} quality={100} loading="eager" />

        </a>
    )
})
const logout = async () => {

    await fetch('https://apextraining.herokuapp.com/logout', {
        method: 'get',
        credentials: 'include'
    });
    window.localStorage.removeItem('_ftTrainerAuth')
    Router.push("/login")
}



const trainerSidebar: React.FC<Props> = ({ setTabT, tabT }) => {

    console.log(window.location.href, "HREFFF")
    return (
        <>
            <div className={styles.sidebar}>
                <div className={styles.sidebar_header}>

                    <MyButton />



                </div>
                <div className={styles.sidebar_tabs_container} style={{ fontWeight: "bold" }}>

                    <Link href="/schedule" >
                        <div onClick={() => setTabT("Schedule")} className={window.location.href === "https://apex-client.vercel.app/schedule" ? styles.sidebar_tab_active : styles.sidebar_tab_unactive}>
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
                    <Link href="/clients">
                        <div onClick={() => setTabT("Clients")} className={window.location.href === "https://apex-client.vercel.app/clients" ? styles.sidebar_tab_active : styles.sidebar_tab_unactive}>
                            <div className={styles.sidebar_tab_content}>
                                <div>

                                    <MdPersonOutline />
                                </div>
                                <div>

                                    <span>Clients</span>
                                </div>
                            </div>

                        </div>
                    </Link>
                    <Link href="/programs" >
                        <div onClick={() => setTabT("Programs")} className={window.location.href === "https://apex-client.vercel.app/programs" ? styles.sidebar_tab_active : styles.sidebar_tab_unactive}>
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
                    <Link href="/appointments" >
                        <div onClick={() => setTabT("Appointments")} className={window.location.href === "https://apex-client.vercel.app/appointments" ? styles.sidebar_tab_active : styles.sidebar_tab_unactive}>
                            <div className={styles.sidebar_tab_content}>
                                <div>

                                    <FaReply />
                                </div>
                                <div>

                                    <span>Appointments</span>
                                </div>
                            </div>

                        </div>
                    </Link>
                    <Link href="/profile" >
                        <div onClick={() => setTabT("Profile")} className={window.location.href === "https://apex-client.vercel.app/profile" ? styles.sidebar_tab_active : styles.sidebar_tab_unactive}>
                            <div className={styles.sidebar_tab_content}>
                                <div>

                                    <CgProfile />
                                </div>
                                <div>

                                    <span>Profile</span>
                                </div>
                            </div>

                        </div>
                    </Link>
                </div>
                <div className={styles.sidebar_logout_container}>
                    <button onClick={logout}>Log out</button>

                </div>
            </div>
        </>
    )
}

export default trainerSidebar