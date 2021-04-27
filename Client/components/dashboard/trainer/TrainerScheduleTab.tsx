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

interface Props {
    trainers: any
    AccountInfo: any
    TodaysClients: any
    state: any
    dispatch: any
}
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


const TrainerScheduleTab: React.FC<Props> = ({ trainers, AccountInfo, TodaysClients, state, dispatch }) => {
    const [value, onChange] = useState(new Date());
    const [tab, setTab] = useState("Schedule")
    const classes = useStyles();
    const { isOpen, onOpen, onClose } = useDisclosure()




    console.log("VALUE:", value)
    return (
        <>
            <div className={styles.bottom_container_left}>
                <Modal onOpen={onOpen} isOpen={isOpen} onClose={onClose} TodaysClients={TodaysClients} AccountInfo={AccountInfo} dispatch={dispatch} state={state} />
                <div className={styles.buttons}>
                    <Fab onClick={onOpen} color="primary" aria-label="add" style={{ position: "absolute", bottom: "25px", right: "60px", zIndex: 1, backgroundColor: "#ee2b45" }}>
                        <AddIcon />
                    </Fab>
                    {/* <div onClick={() => setTab("Add")} style={tab === "Add" ? { boxShadow: "0 0.5em 0.7em -0.4em #000000ce", transform: "translateY(-0.25em)" } : null}> <FiUserPlus className={styles.banner_button_plus} /> Add Client </div> */}

                </div>

                <div className={styles.banner_container}>


                </div>

                <div className={styles.content_container}>

                    <div style={{ width: "100%" }}>
                        {tab === "Add" ? <CreateClientAppointment TodaysClients={TodaysClients} AccountInfo={AccountInfo} /> : <Calendar dispatch={dispatch} state={state} />

                        }

                    </div>
                </div>
            </div>

        </>
    )
}

export default TrainerScheduleTab