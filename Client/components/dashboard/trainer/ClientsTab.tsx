import React, { useState } from 'react'
import styles from "../../../styles/dashboard/ClientsTab.module.scss"
import ClientsListTab from './ClientsListTab'
import RegisterClientTab from './RegisterClientTab'

interface Props {
    AccountInfo: any
}

const ClientsTab: React.FC<Props> = ({ AccountInfo }) => {
    const [tab, setTab] = useState<string>("Back")


    return (
        <>
            <div className={styles.clients_tab_main}>
                <div className={styles.clients_tab_header}>
                    <div>
                        <span>Clients</span>
                    </div>
                    <div>
                        {tab === "Home" && <button onClick={() => setTab("Back")}>Add Client</button>}
                        {tab === "Back" && <button onClick={() => setTab("Home")}>Back</button>}


                    </div>
                </div>
                <div className={styles.clients_tab_content_container}>
                    {tab === "Home" && <ClientsListTab />}
                    {tab === "Back" && <RegisterClientTab AccountInfo={AccountInfo} />}
                </div>
            </div>
        </>
    )
}

export default ClientsTab