import React, { useEffect, useState } from 'react'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import Moment from 'react-moment';
import { FiClock } from 'react-icons/fi';
import { FaRegCalendar } from 'react-icons/fa';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { green100 } from 'material-ui/styles/colors';
import { makeStyles } from "@material-ui/core";
import { useDisclosure } from "@chakra-ui/react"
import Drawer from "../appointmentsPageComponents/drawer"

const useStyles = makeStyles({
    input: {
        height: "20px",
        left: "19px",
        marginLeft: "0px",
        marginRight: "0px",

    }
});
const PurpleSwitch = withStyles({

    switchBase: {

        color: grey[300],
        '&$checked': {
            color: green[500],

        },
        '&$checked + $track': {
            backgroundColor: green[300],

        },
    },
    checked: {},
    track: {},
})(Switch);

const Card = ({ item, index, isToggled, setToggled, dispatch, handleChange, Workouts }) => {
    const classes = useStyles();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [drawerState, setDrawerState] = useState()
    const [size, setSize] = useState("md")

    const handleClick = () => {
        console.log("ITEM", item)
        setDrawerState(item)
        setSize("md")
        onOpen()
    }


    const handleChanged = async (event, item) => {
        console.log("ON CHANGE FIRED!", event.target.checked)
        dispatch({ type: "UPDATE_APPOINTMENT_COMPLETED", AppointmentId: item.id, completed: event.target.checked });
        item.completed = event.target.checked

        await fetch('https://apextraining.herokuapp.com/updateAppointmentCompletedStatus', {
            method: 'POST',
            'credentials': 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: item.id, status: event.target.checked }),
        })

    };

    return (
        <>
            <Drawer Workouts={Workouts} onClose={onClose} onOpen={onOpen} isOpen={isOpen} size={size} drawerState={drawerState} dispatch={dispatch} setDrawerState={setDrawerState} />
            <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} transition={{ duration: 0.3 }} className="rounded-sm mb-6 mx-2 min-w-[330px] max-w-[400px] bg-white flex flex-col" style={{ boxShadow: "0 0 8px rgba(0,0,0,0.12)" }}>
                <div className={item.completed ? "px-2 py-3 w-full items-center justify-between flex text-[#414141] border-t-[7px] border-[#149414] rounded-t-sm" : " px-2 py-3 w-full flex items-center justify-between text-[#414141] border-t-[7px] border-gray-400 rounded-t-sm"}>
                    <div className="flex flex-1 justify-start">

                        <span className="text-[16px] font-semibold">{item.title}</span>
                    </div>
                    <div className="flex flex-1 justify-end">


                        <FormControlLabel
                            classes={{ root: classes.input }}
                            control={<PurpleSwitch checked={item.completed} onChange={(event: any) => handleChanged(event, item)} />}
                            label=""
                        />
                    </div>

                    {/* <span className={item.completed ? "text-[#149414]" : "text-red-500"}>{item.completed ? "Completed" : "Not Completed"}</span> */}
                </div>
                <div className="px-3 py-3 w-full flex flex-row items-center text-[#414141]">
                    <FiClock className="mr-2" />
                    {/* <Moment format="dddd, MMMM Do YYYY">{item.startDate}</Moment> */}
                    <Moment date={item.startDate} format="hh:mm A" className="mr-1" /> - <Moment date={item.endDate} format="hh:mm A" className="ml-1" />
                </div>
                <div className="px-3 py-3 flex flex-row justify-between">

                    <div className="flex flex-row items-center py-1 text-[#414141] h-auto">
                        <FaRegCalendar className="mr-2" />
                        <Moment format="dddd, MMMM Do YYYY">{item.startDate}</Moment>
                    </div>
                    <div className="flex items-center justify-center text-[#649CEA] cursor-pointer hover:underline">
                        <span onClick={() => handleClick()}>View More</span>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Card