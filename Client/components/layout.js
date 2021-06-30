import Topbar from "../components/dashboard/topbar"
import styles from "../styles/dashboard/Dashboard.module.scss"
import React, { useState } from "react"
// AccountInfo = { AccountInfo } setTabG = { setTabG } tabG = { tabG } setTabT = { setTabT } tabT = { tabT } role = { role }
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';

export default function Layout({
    children,
    title = 'This is the default title',
    AccountInfo, role
}) {


    return (

        <>

            <div style={{ display: "flex", flexDirection: "column", minWidth: "100%", overflowX: "hidden", height: "100vh", maxHeight: "100vh" }}  >
                <div className={styles.topbar_container} >
                    <Topbar AccountInfo={AccountInfo} role={role} />

                </div>
                <motion.div initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ type: "spring", duration: 1, bounce: 0.3 }} style={{ display: "flex", minWidth: "100%", overflowX: "hidden", overflowY: "auto" }} className="h-full overflow-y-auto">
                    {children}
                </motion.div>
            </div>
        </>

    )
}

// initial = {{ 0 }} animate = {{ scale:1}} transition = {{ type: "spring", duration: 1, bounce: 0.3 }}