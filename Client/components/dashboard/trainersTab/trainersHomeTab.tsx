import React from 'react'
import styles from "../../../styles/dashboard/TrainersHomeTab.module.scss";
import Image from 'next/image'
import { Bounce } from "react-awesome-reveal";
import { AttentionSeeker } from "react-awesome-reveal";
interface Props {
    trainers: []
}

const TrainersHomeTab: React.FC<Props> = ({ trainers }) => {
    return (
        <>
            <div className={styles.trainers_home_tab_main}>

                <AttentionSeeker effect="pulse" duration={550}>
                    <div className={styles.trainers_home_tab_trainers_container_header}>
                        <h1 >Trainers</h1>
                    </div>
                    <div className={styles.trainers_home_tab_trainers_container}>

                        {trainers.map((trainer: any) => (
                            <div className={styles.trainers_home_tab_trainer}>
                                <div className={styles.trainer_pic_container}>
                                    <div className={styles.pic_container}>
                                        <Image src="/images/defaultavatar.png" width={70} height={70} quality={100} />



                                    </div>
                                    <div className={styles.name_container}>
                                        <div>
                                            <span>{trainer.FirstName}</span>
                                            <span>{trainer.LastName}</span>
                                        </div>
                                        <div>
                                            <span>Team Member</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.clients_container}>
                                    <span>Clients</span>
                                    <span>1 2 3</span>
                                </div>
                                <div className={styles.email_container}>
                                    <span>Email</span>
                                    <span>{trainer.Email}</span>

                                </div>
                                <div className={styles.date_container}>
                                    <span>Join Date</span>
                                    <span>{trainer.JoinDate}</span>
                                </div>
                                <div className={styles.status_container}>
                                    <span>Status</span>
                                    {trainer.LoggedIn ? <div className={styles.loggedIn}>Active</div> : <div className={styles.loggedOut}>Offline</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </AttentionSeeker>
            </div>
        </>
    )
}

export default TrainersHomeTab