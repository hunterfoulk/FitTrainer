import React, { useReducer, useState, useEffect } from 'react'
import Layout from "../components/layout"
import requireAuthentication from "./auth/authtwo"
import All from "../components/appointmentsPageComponents/all"
import Today from "../components/appointmentsPageComponents/today"
import Completed from "../components/appointmentsPageComponents/completed"
import ThisWeek from "../components/appointmentsPageComponents/thisweek"
import Modal from "../components/appointmentsPageComponents/modal"
import { ListItemIcon, ListItemText, MenuItem, Select } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Menu from "../components/appointmentsPageComponents/menu"


const reducer = (state, action) => {
    console.log("FIRED", action)
    switch (action.type) {

        case "SET_APPOINTMENT":
            return {
                ...state,
                appointment: action.item
            }
        case "UPDATE_APPOINTMENT":
            return {
                ...state,
                appointment: { ...state.appointment, startDate: action.startDate, endDate: action.endDate, WorkoutId: action.WorkoutId, workout: action.workout },
                Appointments: state.Appointments.map(appointment => (action.AppointmentId == appointment.AppointmentId ? { ...appointment, startDate: action.startDate, endDate: action.EndDate, WorkoutId: action.WorkoutId, workout: action.workout } : appointment))
            }
        case "DELETE_WORKOUT":
            return {
                ...state,
                appointment: { ...state.appointment, WorkoutId: null, workout: {} },
                Appointments: state.Appointments.map(appointment => (action.AppointmentId == appointment.AppointmentId ? { ...appointment, WorkoutId: null, workout: {} } : appointment))
            }
        case "CLEAR_APPOINTMENT":
            return {
                ...state,
                appointment: {}
            }
        case "UPDATE_APPOINTMENT_WORKOUT":
            return {
                ...state,
                appointment: { ...state.appointment, WorkoutId: action.WorkoutId, workout: action.workout },
                Appointments: state.Appointments.map(appointment => (action.AppointmentId == appointment.AppointmentId ? { ...appointment, WorkoutId: action.WorkoutId, workout: action.workout } : appointment))
            }
        default:
            return state;
    }
};


const AppointmentsPage = ({ AccountInfo, Appointments, Workouts }) => {
    const initialState = { Appointments: Appointments, appointment: {} };
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isToggled, setToggled] = useState(false)
    console.log("Appointments", Appointments)
    const [tab, setTab] = useState("All")
    useEffect(() => {
        if (isToggled) {
            document.body.style.overflow = 'hidden'
        }
        return () => { document.body.style.overflow = 'unset' }

    }, []);

    return (
        <>
            <Layout AccountInfo={AccountInfo} role="Trainer">
                <Modal isToggled={isToggled} setToggled={setToggled} state={state.appointment} dispatch={dispatch} Workouts={Workouts} />
                <div className=" w-full flex justify-center py-3 px-4 bg-[#FCFCFC]">
                    <div className=" w-full max-w-[1400px] flex flex-col ">
                        <div className="flex items-center py-2 justify-between">
                            <h1 className="text-[22px] text-[#414141] font-bold">My Appointments</h1>
                            <Menu setTab={setTab} tab={tab} />
                        </div>
                        <div className=" flex justify-center py-4">
                            <div className=" mt-10 flex flex-row flex-wrap justify-center w-[100%] xl:justify-start ">
                                {tab === "All" && <All Appointments={state.Appointments} isToggled={isToggled} setToggled={setToggled} dispatch={dispatch} />}
                                {tab === "Today" && <Today Appointments={state.Appointments} isToggled={isToggled} setToggled={setToggled} dispatch={dispatch} />}
                                {tab === "This Week" && <ThisWeek Appointments={state.Appointments} isToggled={isToggled} setToggled={setToggled} dispatch={dispatch} />}
                                {tab === "Completed" && <Completed Appointments={state.Appointments} isToggled={isToggled} setToggled={setToggled} dispatch={dispatch} />}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

        </>
    )
}

export default AppointmentsPage

export const getServerSideProps = requireAuthentication(async context => {


    let cookie = context.req?.headers.cookie
    const response = await fetch('http://localhost:9000/appointmentsPage', {
        headers: {
            cookie: cookie!
        }
    });
    const res = await response.json()
    console.log("RESPONSE FOR PROGRAMS", res)

    return {
        props: {
            Appointments: res.data.Appointments,
            AccountInfo: res.data.AccountInfo,
            Workouts: res.data.Workouts,

        },
    }
})

