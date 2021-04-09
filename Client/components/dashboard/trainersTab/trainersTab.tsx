import React, { useState } from 'react'
import styles from "../../../styles/dashboard/TrainersTab.module.scss";
import { FiPlus } from 'react-icons/fi';
import { MdMessage } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import TrainersHomeTab from './trainersHomeTab';
import AddTrainerTab from './trainersAddTrainerTab';
import { FaReply } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';
import Messenger from './messenger/messenger';
import Recents from './recents/recents';

interface Props {
    trainers: [],
    notify: any
    AccountInfo: any
}

const TrainersTab: React.FC<Props> = ({ trainers, notify, AccountInfo }) => {
    const [tab, setTab] = useState("Home")
    console.log("ACC INF OIN TRAINERS TAB", AccountInfo)
    return (
        <>
            <div className={styles.trainers_tab_main}>
                <div className={styles.trainers_tab_nav}>

                    <div className={styles.nav_button_container}>
                        <div className={styles.trainers_tab_nav_header}>
                            <h1>Dashboard</h1>
                        </div>
                        <div className={styles.trainers_tab_buttons_holder}>
                            <div className={styles.nav_button_holder} >
                                <div onClick={() => setTab("Home")} className={styles.nav_button_container_red} style={tab === "Home" ? { boxShadow: "0 0.5em 0.7em -0.4em #000000ce", transform: "translateY(-0.25em)" } : null}>
                                    <span> Trainers </span>
                                    <span ><IoIosPeople /></span>
                                </div>
                            </div>

                            <div className={styles.nav_button_holder}>
                                <div onClick={() => setTab("Trainer")} className={styles.nav_button_container_blue} style={tab === "Trainer" ? { boxShadow: "0 0.5em 0.7em -0.4em #000000ce", transform: "translateY(-0.25em)" } : null} >
                                    <span> Add Trainer</span>
                                    <span ><AiOutlineUsergroupAdd /></span>
                                </div>
                            </div>

                            <div className={styles.nav_button_holder} >
                                <div onClick={() => setTab("Messenger")} className={styles.nav_button_container_green} style={tab === "Messenger" ? { boxShadow: "0 0.5em 0.7em -0.4em #000000ce", transform: "translateY(-0.25em)" } : null}>
                                    <span> Messenger</span>
                                    <span><FaTelegramPlane /></span>
                                </div>
                            </div>

                            <div className={styles.nav_button_holder} >
                                <div onClick={() => setTab("Recents")} className={styles.nav_button_container_purple} style={tab === "Recents" ? { boxShadow: "0 0.5em 0.7em -0.4em #000000ce", transform: "translateY(-0.25em)" } : null}>
                                    <span>Recents</span>
                                    <span ><FaReply /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className={styles.nav_search_container}>
                        <div>
                            <input />
                        </div>
                    </div> */}
                </div>
                <div className={styles.trainers_tab_content}>
                    {tab === "Home" && <TrainersHomeTab trainers={trainers} />}
                    {tab === "Trainer" && <AddTrainerTab notify={notify} AccountInfo={AccountInfo} />}
                    {tab === "Messenger" && <Messenger />}
                    {tab === "Recents" && <Recents />}

                </div>

            </div>

        </>
    )
}

export default TrainersTab