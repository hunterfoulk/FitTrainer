import React, { useState } from 'react'
import styles from "../../../styles/dashboard/TrainersTab.module.scss";
import { FiPlus } from 'react-icons/fi';
import { MdMessage } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import TrainersHomeTab from './trainersHomeTab';
import AddTrainerTab from './trainersAddTrainerTab';


interface Props {

}

const TrainersTab: React.FC<Props> = ({ }) => {
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
                        <div onClick={() => setTab("Board")} className={tab === "Board" ? styles.nav_button_container_active : styles.nav_button_container_unactive}>
                            <span ><MdMessage /></span>
                            <span> Board</span>
                        </div>

                        <div onClick={() => setTab("Clients")} className={tab === "Clients" ? styles.nav_button_container_active : styles.nav_button_container_unactive}>
                            <span><IoMdNotifications /></span>
                            <span>New Clients</span>
                        </div>

                    </div>
                    <div className={styles.nav_search_container}>
                        <div>
                            <input />
                        </div>
                    </div>
                </div>
                <div className={styles.trainers_tab_content}>
                    {tab === "Home" && <TrainersHomeTab />}
                    {tab === "Trainer" && <AddTrainerTab />}

                </div>

            </div>

        </>
    )
}

export default TrainersTab