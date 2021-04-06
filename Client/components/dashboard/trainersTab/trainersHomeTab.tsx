import React from 'react'
import styles from "../../../styles/dashboard/TrainersHomeTab.module.scss";
import Image from 'next/image'

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
                        <div className={styles.trainer_pic_container}>
                            <div className={styles.pic_container}>
                                <Image src="/images/defaultavatar.png" width={70} height={70} quality={100} />
                                {user.LoggedIn ? <div className={styles.loggedIn}></div> : <div className={styles.loggedOut}></div>}


                            </div>
                            <div className={styles.name_container}>
                                <span>{user.FirstName}</span>

                                <span>{user.LastName}</span>
                            </div>
                        </div>
                        <div className={styles.clients_container}>
                            <span>Clients</span>
                            <span>1 2 3</span>
                        </div>
                        <div className={styles.email_container}>
                            <span>Email</span>
                            <span>{user.Email}</span>

                        </div>
                        <div className={styles.date_container}>
                            <span>Join Date</span>
                            <span>{user.JoinDate}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TrainersHomeTab