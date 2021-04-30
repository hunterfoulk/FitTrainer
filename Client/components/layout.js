import Topbar from "../components/dashboard/topbar"
import styles from "../styles/dashboard/Dashboard.module.scss"
import React, { useState } from "react"
// AccountInfo = { AccountInfo } setTabG = { setTabG } tabG = { tabG } setTabT = { setTabT } tabT = { tabT } role = { role }

export default function Layout({
    children,
    title = 'This is the default title',
    AccountInfo, role
}) {


    return (

        <>
            <div style={{ display: "flex", flexDirection: "column", minWidth: "100%" }}>
                <div className={styles.topbar_container}>
                    <Topbar AccountInfo={AccountInfo} role={role} />

                </div>
                <div style={{ display: "flex", minWidth: "100%", height: "100%" }}>
                    {children}
                </div>
            </div>
        </>

    )
}