import React, { useReducer, useState } from 'react'
import TrainerScheduleTab from "../components/dashboard/trainer/TrainerScheduleTab"
import Layout from "../components/layout"
import requireAuthentication from "./auth/authtwo"

interface Props {
    Appointments: any
    AccountInfo: any
    TodaysClients: any
    setTabG: any
    tabG: any
    setTabT: any
    tabT: any
    role: any
    TrainersClients: any
}

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
        case "CHANGED":
            return {
                ...state,
                appointments: state.appointments.map(appointment => (action.changed[appointment.id] ? { ...appointment, ...action.changed[appointment.id] } : appointment))
            }


        default:
            return state;
    }
};

const Schedule: React.FC<Props> = ({ Appointments, AccountInfo, tabG, setTabG, tabT, role, setTabT, TrainersClients }) => {
    const initialState = { appointments: Appointments };
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            <Layout AccountInfo={AccountInfo} role={role}>
                <TrainerScheduleTab AccountInfo={AccountInfo} dispatch={dispatch} state={state} TrainersClients={TrainersClients} />
            </Layout>

        </>
    )
}

export default Schedule

export const getServerSideProps = requireAuthentication(async context => {


    let cookie = context.req?.headers.cookie
    const response = await fetch('http://localhost:9000/schedule', {
        headers: {
            cookie: cookie!
        }
    });
    const res = await response.json()


    return {
        props: {
            role: res.data.role,
            AccountInfo: res.data.AccountInfo,
            Appointments: res.data.Appointments || [],
            TrainersClients: res.data.TrainersClients
        },
    }
})



