import React, { useRef, useEffect, useState, forwardRef } from 'react'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import useClickOutside from "../hooks/useClickOutside"
import useLockBodyScroll from "../hooks/bodyScroll"
import Moment from 'react-moment';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiClock } from 'react-icons/fi';
import { FaRegCalendar } from 'react-icons/fa';
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import styles from "../../styles/dashboard/ProgramsTab.module.scss"
import { Select } from "@chakra-ui/react"


const Modal = ({ isToggled, setToggled, dispatch, state, Workouts }) => {
    const [editingDate, setEditingDate] = useState(false);
    const [editingTime, setEditingTime] = useState(false);
    const [editingWorkout, setEditingWorkout] = useState(false);
    const [workoutId, setWorkoutId] = useState();
    const [workoutObject, setWorkoutObject] = useState({});
    let newStartDate = new Date(state.startDate)
    let newEndDate = new Date(state.endDate)
    const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState<any>();
    console.log("STATE", state)
    // const [startDate, setStartDate] = useState<any>(new Date(state.startDate));
    // const [startDate, setStartDate] = useState<any>(new Date(state.endDate));
    useEffect(
        () => {
            let startDate = new Date(state.startDate);
            let endDate = new Date(state.endDate);
            setStartDate(startDate);
            setEndDate(endDate)
            // setSelectedStage(props.stages.valueSeq().first());
        },
        [state.startDate, state.endDate, state.WorkoutId],
    );
    const ref = useRef<any>();
    useClickOutside(ref, () => {
        setToggled(false)
        dispatch({ type: "CLEAR_APPOINTMENT" })
        setEditingDate(false)
        setEditingTime(false)
        setEditingWorkout(false)


    });
    // state.startDate.split('T')[0]

    const backdrop = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }


    const handleEdit = async (e) => {
        e.preventDefault()

        dispatch({ type: "UPDATE_APPOINTMENT", startDate: startDate, endDate: endDate, AppointmentId: state.AppointmentId, WorkoutId: null, workout: {} })
        setEditingDate(false)
    }

    const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
        <button className="border-2 border-gray rounded-sm shadow-sm w-auto px-1" onClick={onClick}
            ref={ref}>
            <Moment format="LLLL">{value}</Moment>

        </button>
    ));

    const handleDelete = async () => {
        dispatch({ type: "DELETE_WORKOUT", AppointmentId: state.AppointmentId })
        await fetch('http://localhost:9000/deleteWorkoutFromAppointment', {
            method: 'POST',
            'credentials': 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: state.AppointmentId }),
        })
    }


    const handleWorkoutChange = (e) => {
        if (!e.target.value) {
            console.log("none")
        }
        console.log(e.target.value)
        setWorkoutId(e.target.value)
        setWorkoutObject(Workouts.find(p => p.WorkoutId == e.target.value))
    }

    const handleWorkoutSave = async () => {
        if (workoutId) {
            dispatch({ type: "UPDATE_APPOINTMENT_WORKOUT", WorkoutId: workoutId, workout: workoutObject })
            setEditingWorkout(false)
            // await fetch('http://localhost:9000/test', {
            //     method: 'POST',
            //     'credentials': 'include',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ startDate: startDate }),
            // })
        } else {
            return
        }
    }

    return (

        <>
            <AnimatePresence exitBeforeEnter>
                {isToggled && (
                    <motion.div className="backdrop fixed w-full h-full bg-[rgba(0,0,0,0.5)] z-[1] text-center"
                        variants={backdrop}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"

                    >
                        <motion.div ref={ref}
                            initial={{
                                x: 0,
                                y: "50%",
                                scale: 0,
                            }} transition={{
                                type: "Tween", stiffness: 100, duration: 0.3,
                                y: {
                                    duration: 0.3,
                                    ease: "easeIn",
                                }
                            }} animate={{ y: 100, x: 0, scale: 1 }} exit={{ x: 0, y: 0, scale: 0 }} className="shadow-lg bg-white w-[650px] max-w-[90%] flex p-3 rounded-[5px]" style={{ margin: "0 auto" }}>


                            <div className="flex w-[65%] flex-col">
                                <div className="w-full flex justify-center py-1 mb-2">

                                    <img src={state.Avatar} className="h-[70px] w-[70px] rounded-full shadow-lg" />
                                </div>
                                <div className="w-full flex justify-center py-1 mb-2">

                                    <span className="font-semibold text-[18px]">{state.title}</span>
                                </div>

                                {/* <div className="w-full flex items-center py-1 bg-green-300">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        showTimeSelect
                                        dateFormat="Pp"
                                    />
                                </div> */}

                                <div className="w-full flex flex-col items-center py-1">
                                    <span className="font-semibold mb-1 text-[16px]">Appointment Date & Time</span>
                                </div>
                                {editingDate ?
                                    <>
                                        {/* Start Date */}
                                        <span className="mb-1 font-medium mt-2">Start Date</span>
                                        <div className="flex flex-row w-full items-center justify-center text-[#414141] mb-2">
                                            <FaRegCalendar className="mr-2" />
                                            <DatePicker showTimeSelect
                                                minTime={setHours(setMinutes(new Date(), 0), 8)}
                                                maxTime={setHours(setMinutes(new Date(), 30), 19)}
                                                dateFormat="yyyy/MM/dd hh:mm a"

                                                selected={startDate} onChange={(date) => {
                                                    setStartDate(date)
                                                }} customInput={<ExampleCustomInput />} />

                                        </div>

                                        {/* End Date */}
                                        <span className="mb-1 font-medium mt-2">End Date</span>
                                        <div className="flex flex-row w-full items-center justify-center text-[#414141] mb-3">
                                            <FaRegCalendar className="mr-2" />
                                            <DatePicker showTimeSelect
                                                dateFormat="yyyy/MM/dd hh:mm a"

                                                minTime={setHours(setMinutes(new Date(), 0), 8)}
                                                maxTime={setHours(setMinutes(new Date(), 30), 19)}

                                                selected={endDate} onChange={(date) => {
                                                    setEndDate(date)

                                                }} customInput={<ExampleCustomInput />} />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="flex flex-row w-full items-center justify-center text-[#414141] mb-2">
                                            <FaRegCalendar className="mr-2" />
                                            <Moment format="dddd, MMMM Do YYYY">{state.startDate}</Moment>

                                        </div>
                                        <div className="flex flex-row w-full items-center justify-center text-[#414141] mb-2">
                                            <FiClock className="mr-2" />

                                            <Moment date={state.startDate} format="hh:mm A" className="mr-1" /> - <Moment date={state.endDate} format="hh:mm A" className="ml-1" />
                                        </div>
                                    </>
                                }
                                <div className="flex flex-row w-full items-center justify-center mb-2">
                                    {
                                        editingDate ? <><span className="text-gray-300 cursor-pointer hover:underline py-1 mx-3" onClick={() => {
                                            setEditingDate(false)
                                            setWorkoutId(null)
                                            setWorkoutObject({})

                                        }
                                        }>Cancel</span> <span onClick={(e: any) => handleEdit(e)} className="text-[#649CEA] font-medium cursor-pointer hover:underline py-1 mx-3">Save</span></> : <span className="text-[#649CEA] cursor-pointer hover:underline py-1" onClick={() => setEditingDate(true)}>Edit Date</span>
                                    }

                                </div>


                            </div>

                            <div className="flex flex-col w-[35%] items-center">
                                <div className="w-full flex justify-center">
                                    <span className="font-semibold text-[18px]">Workout</span>
                                </div>

                                <div>
                                    {state.WorkoutId !== null ?
                                        <>
                                            <div className="mt-2">

                                                <span className="text-[16px] font-semibold mt-2">{state.workout.workout_name}</span>

                                            </div>
                                            <div className="w-full flex flex-col mt-3 mb-2 ">
                                                {state.workout.exercises.map((item) => (
                                                    <>
                                                        <div className="shadow-md rounded-md p-1 mb-2 border border-gray-200">

                                                            <span>{item.Name}</span>
                                                        </div>
                                                    </>
                                                ))}

                                            </div>
                                            <div className="mt-2 mb-3">
                                                <span className="text-[#649CEA] font-medium cursor-pointer hover:underline " onClick={() => handleDelete()}>Delete Workout</span>

                                            </div>
                                        </>
                                        :
                                        <>
                                            {
                                                editingWorkout ?
                                                    <>
                                                        <div className="flex flex-col items-center mt-2">
                                                            <span className="font-semibold text-[16px] mb-2">Select Workout</span>
                                                            <Select placeholder="Select Workout" size="sm" onChange={(e: any) => handleWorkoutChange(e)}>

                                                                {
                                                                    Workouts.map((workout) => (
                                                                        <>
                                                                            <option value={workout.WorkoutId}>{workout.workout_name}</option>
                                                                        </>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </div>
                                                        <div className="flex flex-row justify-center mt-3">
                                                            <span className="text-gray-300 cursor-pointer hover:underline py-1 mx-3" onClick={() => {
                                                                setEditingWorkout(false)
                                                                setWorkoutId(null)

                                                            }
                                                            }>Cancel</span>
                                                            <span className="text-[#649CEA] font-medium cursor-pointer hover:underline py-1 mx-3" onClick={() => handleWorkoutSave()}>Save</span>
                                                        </div>
                                                    </>
                                                    :
                                                    <div className="flex flex-col w-full">
                                                        <span className="py-1">No Workout Added</span>
                                                        <span className="text-[#649CEA] cursor-pointer hover:underline py-1" onClick={() => setEditingWorkout(true)}>Add Workout</span>
                                                    </div>
                                            }


                                        </>
                                    }
                                </div>
                            </div>


                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Modal

