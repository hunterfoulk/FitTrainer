import React from 'react'
import styles from "../../../styles/dashboard/ClientsList.module.scss"
import moment from 'moment';
interface Props {
    TodaysClients: any
}

const ClientsListTab: React.FC<Props> = ({ TodaysClients }) => {




    return (
        <>
            <div className={styles.clients_list_main}>
                <div className={styles.row_header}>
                    <div>
                        <span>Client</span>
                    </div>
                    <div>
                        <span>Goal</span>
                    </div>
                    <div>
                        <span>Age</span>
                    </div>
                    <div>
                        <span>Created</span>
                    </div>
                </div>
                {TodaysClients.map((client: any) => {
                    let date = moment("20111031", "YYYYMMDD").fromNow(client.Birthday);
                    // let joinDate = moment().startOf(client.JoinDate);
                    let myDate = new Date(client.JoinDate);
                    // let noTime = new Date(myDate.getFullYear(), myDate.getMonth());
                    // console.log(noTime)
                    let newdDate = myDate.toISOString().split('T')[0]
                    console.log("date", newdDate);
                    return (
                        <div className={styles.list_item}>
                            <div className={styles.name_container}>
                                <div className={styles.avatar_container}>
                                    <img src={client.Avatar} />
                                </div>
                                <div className={styles.text_container}>
                                    <span>{client.FirstName.charAt(0).toUpperCase() + client.FirstName.slice(1)} {client.LastName.charAt(0).toUpperCase() + client.LastName.slice(1)}</span>
                                    <span>{client.Mobile}</span>
                                </div>

                            </div>
                            <div>
                                <span>0 / 3</span>
                            </div>
                            <div>
                                <span>{date} old</span>
                            </div>
                            <div>
                                <span>{newdDate}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ClientsListTab