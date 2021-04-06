import React, { useState } from 'react'
import styles from "../../../styles/dashboard/TrainersTab.module.scss";
import { FiPlus } from 'react-icons/fi';
import { MdMessage } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import TrainersHomeTab from './trainersHomeTab';
import AddTrainerTab from './trainersAddTrainerTab';
import { FaReply } from 'react-icons/fa';


interface Props {
    users: []
}

const TrainersTab: React.FC<Props> = ({ users }) => {
    const [tab, setTab] = useState("Home")

    return (
        <>
            <div className={styles.trainers_tab_main}>
                <div className={styles.trainers_tab_nav}>
                    <div className={styles.nav_button_container}>
                        <div onClick={() => setTab("Home")} className={tab === "Home" ? styles.nav_button_container_active : styles.nav_button_container_unactive}>
                            <span><FaHome /></span>
                            <span> Home </span>
                        </div>

                        <div onClick={() => setTab("Trainer")} className={tab === "Trainer" ? styles.nav_button_container_active : styles.nav_button_container_unactive}>
                            <span><FiPlus /></span>
                            <span> Add Trainer</span>
                        </div>
                        <div onClick={() => setTab("Messenger")} className={tab === "Messenger" ? styles.nav_button_container_active : styles.nav_button_container_unactive}>
                            <span ><MdMessage /></span>
                            <span> Messenger</span>
                        </div>

                        <div onClick={() => setTab("Activity")} className={tab === "Activity" ? styles.nav_button_container_active : styles.nav_button_container_unactive}>
                            <span><FaReply /></span>
                            <span>Recents</span>
                        </div>

                    </div>
                    <div className={styles.nav_search_container}>
                        <div>
                            <input />
                        </div>
                    </div>
                </div>
                <div className={styles.trainers_tab_content}>
                    {tab === "Home" && <TrainersHomeTab users={users} />}
                    {tab === "Trainer" && <AddTrainerTab />}

                </div>

            </div>

        </>
    )
}

export default TrainersTab