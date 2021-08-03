import React, { useRef, useEffect, useState, forwardRef } from 'react'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import useClickOutside from "../hooks/useClickOutside"
import useLockBodyScroll from "../hooks/bodyScroll"
import Moment from 'react-moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiClock } from 'react-icons/fi';
import { FaRegCalendar } from 'react-icons/fa';
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'

const Modal = ({ isToggled, setToggled, dispatch, state }) => {
    const [editingDate, setEditingDate] = useState(false);
    const [editingTime, setEditingTime] = useState(false);
    const [startDate, setStartDate] = useState<any>(new Date(state.startDate));
    const [endDate, setEndDate] = useState<any>(new Date(state.endDate));

    const event = new Date(state.endDate);


    const ref = useRef<any>();
    useClickOutside(ref, () => {
        setToggled(false)
        dispatch({ type: "CLEAR_APPOINTMENT" })
        setEditingDate(false)
        setEditingTime(false)


    });
    // state.startDate.split('T')[0]

    const backdrop = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }





    const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
        <button className="border-2 border-gray rounded-sm shadow-sm w-auto px-1" onClick={onClick}
            ref={ref}>
            <Moment format="LLLL">{value}</Moment>

        </button>
    ));

    console.log("START DATE", startDate)

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
                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                selected={startDate} onChange={async (date) => {
                                                    setStartDate(date)

                                                    // await fetch('http://localhost:9000/test', {
                                                    //     method: 'POST',
                                                    //     'credentials': 'include',
                                                    //     headers: {
                                                    //         'Content-Type': 'application/json',
                                                    //     },
                                                    //     body: JSON.stringify({ startDate: startDate }),
                                                    // })

                                                }} customInput={<ExampleCustomInput />} />
                                        </div>

                                        {/* End Date */}
                                        <span className="mb-1 font-medium mt-2">End Date</span>
                                        <div className="flex flex-row w-full items-center justify-center text-[#414141] mb-3">
                                            <FaRegCalendar className="mr-2" />
                                            <DatePicker showTimeSelect
                                                minTime={setHours(setMinutes(new Date(), 0), 8)}
                                                maxTime={setHours(setMinutes(new Date(), 30), 19)}
                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                selected={endDate} onChange={async (date) => {
                                                    setEndDate(date)

                                                    // await fetch('http://localhost:9000/test', {
                                                    //     method: 'POST',
                                                    //     'credentials': 'include',
                                                    //     headers: {
                                                    //         'Content-Type': 'application/json',
                                                    //     },
                                                    //     body: JSON.stringify({ startDate: startDate }),
                                                    // })

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

                                        }
                                        }>Cancel</span> <span onClick={() => dispatch({ type: "UPDATE_APPOINTMENT", startDate: startDate, endDate })} className="text-[#649CEA] font-medium cursor-pointer hover:underline py-1 mx-3">Save</span></> : <span className="text-[#649CEA] cursor-pointer hover:underline py-1" onClick={() => setEditingDate(true)}>Edit Date</span>
                                    }

                                </div>

                                {/* <div className="w-full flex flex-col items-center py-1">
                                    <span className="font-semibold mb-1 text-[16px]">Appointment Time</span>
                                </div> */}
                                {/* <div className="flex flex-row w-full items-center justify-center text-[#414141] mb-2">
                                    <FiClock className="mr-2" />

                                    <Moment date={state.startDate} format="hh:mm A" className="mr-1" /> - <Moment date={state.endDate} format="hh:mm A" className="ml-1" />
                                </div> */}
                                {/* <div className="flex flex-row w-full items-center justify-center mb-2">
                                    <span className="text-[#649CEA] cursor-pointer hover:underline py-1">Edit Time</span>
                                </div> */}

                            </div>

                            <div className="flex flex-col w-[35%] ">
                                <div className="w-full flex justify-center">
                                    <span className="font-semibold text-[18px]">Workout</span>
                                </div>
                                <div>
                                    {state.WorkoutId !== null ?
                                        <div>
                                            <span>
                                                <span>{state.workout.workout_name}</span>
                                            </span>
                                        </div> :
                                        <>
                                            <div className="flex flex-col w-full">
                                                <span className="py-1">No Workout Added</span>
                                                <span className="text-[#649CEA] cursor-pointer hover:underline py-1">Add Workout</span>
                                            </div>
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

