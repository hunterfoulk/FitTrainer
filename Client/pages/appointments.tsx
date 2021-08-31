import React, { useReducer, useState, useEffect } from 'react'
import Layout from "../components/layout"
import requireAuthentication from "./auth/authtwo"
import All from "../components/appointmentsPageComponents/all"
import Today from "../components/appointmentsPageComponents/today"
import Completed from "../components/appointmentsPageComponents/completed"
import ThisWeek from "../components/appointmentsPageComponents/thisweek"
import Modal from "../components/appointmentsPageComponents/modal"
import CreateModal from "../components/appointmentsPageComponents/createAppointmentModal"
import { ListItemIcon, ListItemText, MenuItem, Select } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Menu from "../components/appointmentsPageComponents/menu"
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { useDisclosure } from "@chakra-ui/react"


const reducer = (state, action) => {
    console.log("FIRED YO", action)
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
                Appointments: state.Appointments.map(appointment => (action.AppointmentId == appointment.id ? { ...appointment, startDate: action.startDate, endDate: action.EndDate, WorkoutId: action.WorkoutId, workout: action.workout } : appointment))
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


const AppointmentsPage = ({ AccountInfo, Appointments, Workouts, TrainersClients }) => {
    const initialState = { Appointments: Appointments, appointment: {} };
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isToggled, setToggled] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    console.log("Appointments", Appointments)

    const handleChange = (event, item) => {
        console.log("ON CHANGE FIRED!", event.target.checked)
        dispatch({ type: "UPDATE_APPOINTMENT_COMPLETED", AppointmentId: item.id, completed: event.target.checked });
        item.checked = event.target.checked
    };

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
                <CreateModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} TrainersClients={TrainersClients} AccountInfo={AccountInfo} state={state} dispatch={dispatch} />
                <Modal isToggled={isToggled} setToggled={setToggled} state={state.appointment} dispatch={dispatch} Workouts={Workouts} />
                <div className=" w-full flex justify-center py-3 px-4 bg-[#FCFCFC] overflow-y-auto">
                    <div className=" w-full max-w-[1400px] flex flex-col ">
                        <div className="flex items-center py-2">

                            <div className="flex flex-1">
                                <h1 className="text-[22px] text-[#414141] font-bold">My Appointments</h1>
                            </div>
                            <div className="flex flex-1 justify-end items-center" >
                                <Fab onClick={onOpen} color="primary" aria-label="add" style={{ backgroundColor: "#ee2b45", height: "43px", width: "43px", marginRight: "25px" }}>
                                    <AddIcon />
                                </Fab>
                                <Menu setTab={setTab} tab={tab} />
                            </div>
                        </div>
                        <div className=" flex justify-center py-4">
                            <div className=" mt-10 flex flex-row flex-wrap justify-center w-[100%] overflow-y-auto xl:justify-start ">
                                {tab === "All" && <All Appointments={state.Appointments} isToggled={isToggled} setToggled={setToggled} dispatch={dispatch} handleChange={handleChange} />}
                                {tab === "Today" && <Today Appointments={state.Appointments} isToggled={isToggled} setToggled={setToggled} dispatch={dispatch} handleChange={handleChange} />}
                                {tab === "This Week" && <ThisWeek Appointments={state.Appointments} isToggled={isToggled} setToggled={setToggled} dispatch={dispatch} handleChange={handleChange} />}
                                {tab === "Completed" && <Completed Appointments={state.Appointments} isToggled={isToggled} setToggled={setToggled} dispatch={dispatch} handleChange={handleChange} />}
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
            TrainersClients: res.data.TrainersClients,

        },
    }
})

