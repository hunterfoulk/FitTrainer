import React, { useReducer, useState, useEffect, useContext } from 'react'
import TrainerScheduleTab from "../components/dashboard/trainer/TrainerScheduleTab"
import Layout from "../components/layout"
import requireAuthentication from "./auth/authtwo"
import { useDisclosure } from "@chakra-ui/react"
import Drawer from "../components/appointmentsPageComponents/drawer"

const reducer = (state, action) => {
    console.log("APPOINTMENTSSS REDUCER ACTION", action)
    // console.log("UPDATE", action.type)


    switch (action.type) {

        case "SET_APPOINTMENT":
            return {
                ...state,
                appointment: action.item
            }
        case "UPDATE_APPOINTMENTS":
            return {
                ...state,
                Appointments: [...state.Appointments, action.appointment]
            }
        case "UPDATE_APPOINTMENT":
            return {
                ...state,
                appointment: { ...state.appointment, startDate: action.startDate, endDate: action.endDate, WorkoutId: action.WorkoutId, workout: action.workout },
                Appointments: state.Appointments.map(appointment => (action.AppointmentId == appointment.id ? { ...appointment, startDate: action.startDate, endDate: action.endDate } : appointment))
            }
        case "DELETE_WORKOUT":
            return {
                ...state,
                appointment: { ...state.appointment, WorkoutId: null, workout: {} },
                Appointments: state.Appointments.map(appointment => (action.AppointmentId == appointment.id ? { ...appointment, WorkoutId: null, workout: {} } : appointment))
            }
        case "FILTER_APPOINTMENTS":
            return {
                ...state,
                Appointments: state.Appointments.filter((item) => item.id !== action.id)
            };
        case "CLEAR_APPOINTMENT":
            return {
                ...state,
                appointment: {}
            }
        case "UPDATE_APPOINTMENT_WORKOUT":
            return {
                ...state,
                appointment: { ...state.appointment, WorkoutId: action.WorkoutId, workout: action.workout },
                Appointments: state.Appointments.map(appointment => (action.AppointmentId == appointment.id ? { ...appointment, WorkoutId: action.WorkoutId, workout: action.workout } : appointment))
            }
        case "UPDATE_APPOINTMENT_COMPLETED":
            return {
                ...state,
                Appointments: state.Appointments.map(appointment => (action.AppointmentId == appointment.id ? { ...appointment, completed: action.completed } : appointment))
            }

        default:
            return state;
    }
};

const Schedule = ({ Appointments, AccountInfo, tabG, setTabG, tabT, role, setTabT, TrainersClients, Workouts }) => {
    const initialState = { Appointments: Appointments, appointment: {} };
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isToggled, setToggled] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [drawerState, setDrawerState] = useState()
    const [size, setSize] = useState("md")

    const handleClick = (data) => {
        console.log("ITEM", data)
        setDrawerState(data)
        setSize("md")
        onOpen()
    }



    return (
        <>
            <Layout AccountInfo={AccountInfo} role={role}>
                <Drawer Workouts={Workouts} onClose={onClose} onOpen={onOpen} isOpen={isOpen} size={size} drawerState={drawerState} dispatch={dispatch} setDrawerState={setDrawerState} />

                <TrainerScheduleTab AccountInfo={AccountInfo} TrainersClients={TrainersClients} Workouts={Workouts} drawerState={drawerState} setDrawerState={setDrawerState} state={state} dispatch={dispatch} handleClick={handleClick} />
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



