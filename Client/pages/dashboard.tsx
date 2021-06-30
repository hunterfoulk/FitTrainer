import React, { useState, useReducer, useEffect } from 'react'
import styles from "../styles/dashboard/Dashboard.module.scss"
import Sidebar from "../components/dashboard/sidebar"
import Topbar from "../components/dashboard/topbar"
import { NextPageContext } from "next"

import { NextPage } from 'next'
import requireAuthentication from "./auth/authtwo"
import fetch from "isomorphic-unfetch"
import TrainerSidebar from '../components/dashboard/trainerSidebar'
import TrainersTab from "../components/dashboard/trainersTab/trainersTab"
// import TrainerScheduleTab from "../components/dashboard/trainer/TrainerScheduleTab"
import SubscriptionsTab from '../components/dashboard/subscriptionsTab'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ProgramsTab from "../components/dashboard/trainer/ProgramsTab"
import DashboardHome from "../components/dashboard/DashboardHome"
import Layout from "../components/layout"
import dynamic from 'next/dynamic'
import Router from "next/router"


interface Props {
    trainers: any,
    AccountInfo: any
    TodaysClients: any
    setTabG: any
    tabG: any
    setTabT: any
    tabT: any
    role: any

}




const Dashboard: NextPage<Props> = ({ role, trainers, AccountInfo, setTabG, tabG, setTabT, tabT }) => {




    const notify = () => {
        toast.error(' Trainer Added!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: { backgroundColor: "#e0021b" }
        });
    }


    return (
        <>
            <Layout AccountInfo={AccountInfo} role={role}>
                <div className={styles.dashboard_main}>
                    {/* /////TRAINER//// */}

                    <div className={styles.dashboard_main_right_container}>


                        <div className={styles.bottom_container}>
                            <DashboardHome />

                        </div>

                    </div>

                </div>
            </Layout>


        </>
    )
}

export const getServerSideProps = requireAuthentication(async context => {


    let cookie = context.req?.headers.cookie


    console.log("HEADERS", context.req?.headers)

    const response = await fetch('http://localhost:9000/dashboard', {
        headers: {
            cookie: cookie!
        },

    });
    console.log("STATUS", response.status)
    if (response.status === 404) {

        return {
            redirect: {
                destination: '/login',
                statusCode: 307
            }
        }
    } else {
        const res = await response.json()
        console.log("Dashboard response", res.data.clients)


        return {
            props: {
                trainers: res.data.trainers || res.data.clients || [],
                role: res.data.role || null,
                AccountInfo: res.data.AccountInfo || null,
                TodaysClients: res.data.TodaysClients || [],
            },
        }
    }
})


export default Dashboard
