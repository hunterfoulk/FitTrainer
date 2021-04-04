import React from 'react'
import styles from "../../styles/dashboard/Topbar.module.scss"
import { FaRegBell } from 'react-icons/fa';


interface Props {

}

const Topbar: React.FC<Props> = ({ }) => {
    return (
        <>
            <div className={styles.topbar}>
                <div className={styles.topbar_empty_container}>

                </div>
                <div className={styles.topbar_notification_container}>
                    <FaRegBell />
                </div>
                <div className={styles.topbar_profile_container}>

                    <span>A</span> <span>ApexPerformance</span>
                </div>
            </div>
        </>
    )
}

export default Topbar