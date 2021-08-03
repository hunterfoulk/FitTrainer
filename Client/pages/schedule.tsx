import React, { useReducer, useState, useEffect, useContext } from 'react'
import TrainerScheduleTab from "../components/dashboard/trainer/TrainerScheduleTab"
import Layout from "../components/layout"
import { AppointmentContext } from "../context/context"
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
    Workouts: any
}

const reducer = (state, action) => {
    console.log("APPOINTMENTSSS REDUCER ACTION", action)
    // console.log("UPDATE", action.type)


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
            };
        case "DELETE_WORKOUT":
            return {
                ...state,
                appointments: state.appointments.map(appointment => action.id == appointment.id ? { ...appointment, WorkoutId: null, workout: {} } : appointment)
            }
        case "UPDATE_WORKOUT":
            return {
                ...state,
                appointments: state.appointments.map(appointment => action.id == appointment.id ? { ...appointment, WorkoutId: action.WorkoutId, workout: action.workout } : appointment)
            }
        case "SET_APPOINTMENT":
            return {
                ...state,
                appointment: action.appointment
            }

        default:
            return state;
    }
};

const Schedule: React.FC<Props> = ({ Appointments, AccountInfo, tabG, setTabG, tabT, role, setTabT, TrainersClients, Workouts }) => {
    const { dispatch: appointmentDispatch, appData } = useContext(AppointmentContext);


    useEffect(() => {

        if (Appointments) {
            appointmentDispatch({ type: "SET_APPOINTMENTS", appointments: Appointments })

        }

    }, [])


    return (
        <>
            <Layout AccountInfo={AccountInfo} role={role}>
                <TrainerScheduleTab AccountInfo={AccountInfo} TrainersClients={TrainersClients} Workouts={Workouts} />
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
            TrainersClients: res.data.TrainersClients || [],
            Workouts: res.data.workouts || []
        },
    }
})



