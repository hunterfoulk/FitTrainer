import React, { useState, useReducer, useEffect } from 'react'
import styles from "../styles/dashboard/Dashboard.module.scss"
import Sidebar from "../components/dashboard/sidebar"
import Topbar from "../components/dashboard/topbar"
import { NextPageContext } from "next"
import { useDispatch, useSelector } from "react-redux"
import { NextPage } from 'next'
import requireAuthentication from "./auth/authtwo"
import fetch from "isomorphic-unfetch"
import TrainerSidebar from '../components/dashboard/trainerSidebar'
import TrainersTab from "../components/dashboard/trainersTab/trainersTab"
import TrainerScheduleTab from "../components/dashboard/trainer/TrainerScheduleTab"
import SubscriptionsTab from '../components/dashboard/subscriptionsTab'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import dynamic from 'next/dynamic'
interface Props {
    trainers: any,
    role: any
    AccountInfo: any
    TodaysClients: any
    Appointments: any

}
const DynamicComponentWithNoSSR = dynamic(
    () => import('../components/dashboard/trainer/ClientsTab'),
    { ssr: false }
)


const reducer = (state, action) => {
    console.log("ACTION", action.appointment)
    console.log("UPDATE", action.type)
    console.log("STATE", state)
    switch (action.type) {

        case "UPDATE":
            return {
                ...state,
                appointments: [...state.appointments, action.appointment]
            };
        case "FILTER_APPOINTMENTS":
            return {
                ...state,
                appointments: state.appointments.filter((item) => item.id !== action.id),
            };


        default:
            return state;
    }
};


const Dashboard: NextPage<Props> = ({ role, trainers, AccountInfo, TodaysClients, Appointments }) => {
    // const dispatch = useDispatch();
    const { auth } = useSelector((state: any) => state.auth);
    const [tabG, setTabG] = useState("Trainers")
    const [tabT, setTabT] = useState("Clients")
    const initialState = { appointments: Appointments };
    const [state, dispatch] = useReducer(reducer, initialState);



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
            {/* /////GYM//// */}
            {role === "Gym" ? <div className={styles.dashboard_main}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                />

                <div className={styles.dashboard_main_right_container}>

                    <div className={styles.topbar_container}>
                        <Topbar AccountInfo={AccountInfo} setTabG={setTabG} tabG={tabG} setTabT={setTabT} tabT={tabT} role={role} />
                    </div>
                    <div className={styles.bottom_container}>
                        {tabG === "Trainers" && <TrainersTab trainers={trainers} notify={notify} AccountInfo={AccountInfo} />}
                        {tabG === "Subscriptions" && <SubscriptionsTab />}
                    </div>

                </div>


            </div> : <div className={styles.dashboard_main}>
                {/* /////TRAINER//// */}
                <div className={styles.dashboard_main_right_container}>

                    <div className={styles.topbar_container}>
                        <Topbar AccountInfo={AccountInfo} setTabG={setTabG} tabG={tabG} setTabT={setTabT} tabT={tabT} role={role} />
                    </div>

                    <div className={styles.bottom_container}>
                        {tabT === "Schedule" && <TrainerScheduleTab trainers={trainers} AccountInfo={AccountInfo} TodaysClients={TodaysClients} dispatch={dispatch} state={state} />}
                        {tabT === "Subscriptions" && <SubscriptionsTab />}
                        {tabT === "Clients" && <DynamicComponentWithNoSSR AccountInfo={AccountInfo} TodaysClients={TodaysClients} />}


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
    console.log("Dashboard response", res.data.clients)

    return {
        props: {
            trainers: res.data.trainers || res.data.clients,
            role: res.data.role,
            AccountInfo: res.data.AccountInfo,
            TodaysClients: res.data.TodaysClients || [],
            Appointments: res.data.Appointments || []
        },
    }
})


export default Dashboard
