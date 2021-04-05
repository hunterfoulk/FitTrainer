import React, { useState } from 'react'
import styles from "../styles/dashboard/Dashboard.module.scss"
import Sidebar from "../components/dashboard/sidebar"
import Topbar from "../components/dashboard/topbar"
import { NextPageContext } from "next"
import { useDispatch, useSelector } from "react-redux"
import { authTrue, authFalse } from "../redux/authSlice"
import { NextPage } from 'next'
// import { Auth } from "./auth/auth"
import withAuth from "./auth/auth"
import requireAuthentication from "./auth/authtwo"
import fetch from "isomorphic-unfetch"
import TrainerSidebar from '../components/dashboard/trainerSidebar'
import TrainersTab from "../components/dashboard/trainersTab/trainersTab"
import SubscriptionsTab from '../components/dashboard/subscriptionsTab'
interface Props {
    users: any,
    role: any


}


const Dashboard: NextPage<Props> = ({ role, users }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state: any) => state.auth);
    const [tabG, setTabG] = useState("Trainers")
    const [tabT, setTabT] = useState("Schedule")

    return (
        <>
            {role === "Gym" ? <div className={styles.dashboard_main}>
                <div className={styles.sidebar_container}>

                    <Sidebar setTabG={setTabG} tabG={tabG} />
                </div>
                <div className={styles.dashboard_main_right_container}>

                    <div className={styles.topbar_container}>
                        <Topbar />
                    </div>
                    <div className={styles.bottom_container}>
                        {tabG === "Trainers" && <TrainersTab users={users} />}
                        {tabG === "Subscriptions" && <SubscriptionsTab />}
                    </div>

                </div>


            </div> : <div className={styles.dashboard_main}>
                <div className={styles.sidebar_container}>

                    <TrainerSidebar setTabT={setTabT} tabT={tabT} />
                </div>
                <div className={styles.dashboard_main_right_container}>

                    <div className={styles.topbar_container}>
                        <Topbar />
                    </div>



                </div>


            </div>}

        </>
    )
}

export const getServerSideProps = requireAuthentication(async context => {


    let cookie = context.req?.headers.cookie
    const response = await fetch('http://localhost:9000/dashboard', {
        headers: {
            cookie: cookie!
        }
    });
    const res = await response.json()
    console.log("RESPONSE!@@$", res)

    return {
        props: {
            users: res.data.response,
            role: res.data.role
        },
    }
})


export default Dashboard
