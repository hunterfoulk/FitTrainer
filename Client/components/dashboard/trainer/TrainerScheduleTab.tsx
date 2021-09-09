import React, { useState, useEffect } from 'react'
import styles from "../../../styles/dashboard/TrainerScheduleTab.module.scss"
import { FiPlus } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
// import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FiUserPlus } from 'react-icons/fi';
import ClientCard from './ClientCard';
import CreateClientAppointment from './CreateClientAppointment';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import Calendar from "./Calendar"
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Modal from "./Modal"
import { useDisclosure } from "@chakra-ui/react"
import { Select } from "@chakra-ui/react"



const useStyles = makeStyles({
    list: {
        width: 300,
        display: "flex",
        alignItems: "stretch"
    },
    paper: {
        width: 350,
        display: "flex",
        alignItems: "stretch"
    }
});


const TrainerScheduleTab = ({ AccountInfo, TrainersClients, Workouts, state, dispatch, setDrawerState, drawerState, handleClick }) => {
    const [value, onChange] = useState(new Date());
    const classes = useStyles();
    const { isOpen, onOpen, onClose } = useDisclosure()




    console.log("VALUE:", value)
    return (
        <>



            {/* <div onClick={() => setTab("Add")} style={tab === "Add" ? { boxShadow: "0 0.5em 0.7em -0.4em #000000ce", transform: "translateY(-0.25em)" } : null}> <FiUserPlus className={styles.banner_button_plus} /> Add Client </div> */}


            <Modal onOpen={onOpen} isOpen={isOpen} onClose={onClose} TrainersClients={TrainersClients} AccountInfo={AccountInfo} dispatch={dispatch} />

            <Calendar Workouts={Workouts} dispatch={dispatch} state={state} drawerState={drawerState} setDrawerState={setDrawerState} handleClick={handleClick} />
            <Fab onClick={onOpen} color="primary" aria-label="add" style={{ position: "fixed", bottom: "25px", right: "60px", zIndex: 1, backgroundColor: "#ee2b45" }}>
                <AddIcon />
            </Fab>

        </>
    )
}

export default TrainerScheduleTab