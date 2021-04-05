import React from 'react'
import styles from "../../../styles/dashboard/TrainersHomeTab.module.scss";

interface Props {
    users: []
}

const TrainersHomeTab: React.FC<Props> = ({ users }) => {
    return (
        <>
            <div className={styles.trainers_home_tab_trainers_container}>
                <div className={styles.trainers_home_tab_trainers_container_header}>
                    <h1>Trainers</h1>
                </div>
                {users.map((user: any) => (
                    <div className={styles.trainers_home_tab_trainer}>
                        <h3>{user.Email}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TrainersHomeTab