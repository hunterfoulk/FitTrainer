import React, { useState } from 'react'
import styles from "../../../styles/dashboard/ClientsTab.module.scss"
import ClientsListTab from './ClientsListTab'
import RegisterClientTab from './RegisterClientTab'

interface Props {

}

const ClientsTab: React.FC<Props> = ({ }) => {
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
                    {tab === "Back" && <RegisterClientTab />}
                </div>
            </div>
        </>
    )
}

export default ClientsTab