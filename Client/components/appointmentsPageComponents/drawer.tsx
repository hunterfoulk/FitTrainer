import React, { useState, useEffect, forwardRef } from 'react';
import { useDisclosure } from "@chakra-ui/react"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, } from "@chakra-ui/react";
import Moment from 'react-moment';
import { FiClock } from 'react-icons/fi';
import { FaRegCalendar } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import { Select } from "@chakra-ui/react"
import Swal from 'sweetalert2'


const WorkoutContent = ({ drawerState, setDrawerState }) => {


    console.log("DRAWER", drawerState)
    const handleDelete = async () => {
        setDrawerState(prevState => ({
            ...prevState,
            workout: null,
            WorkoutId: null
        }));
        await fetch('http://localhost:9000/deleteWorkoutFromAppointment', {
            method: 'POST',
            'credentials': 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: drawerState.id }),
        })
    }

    return (

        <div className="flex w-full justify-center flex-col items-center">

            {drawerState.workout.exercises ? drawerState.workout.exercises.map((y, i) => (



                <div className="w-[80%] flex mb-6 shadow-md border border-gray-200 rounded-sm">
                    <div className="flex flex-none items-center">
                        <img src={y.muscle_group_img} className="h-24 w-24" />
                    </div>
                    <div className="flex flex-grow text-center flex-col items-center">
                        <div className="w-full text-black p-1 bg-gray-200">
                            <span>{y.Name}</span>
                        </div>
                        <div className="w-full flex justify-center p-1">
                            <div className="flex-1 flex flex-col items-center  ">

                                <span>Sets</span>
                                <span>{y.sets}</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center">

                                <span>Reps</span>
                                <span>{y.reps}</span>
                            </div>
                        </div>
                    </div>
                </div>



            )
            )
                : null}
            <span onClick={handleDelete} className="text-red-400 cursor-pointer pb-[20px] hover:underline ">Delete Workout</span>
        </div>

    )
}


export default function SideDrawer({ drawerState, onOpen, isOpen, onClose, size, dispatch, setDrawerState, Workouts }) {
    const [editingDate, setEditingDate] = useState(false)
    const [choosingWorkout, setChoosingWorkout] = useState(false)
    const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState<any>();
    const [newOptions, setOptions] = useState<any>();
    const [workoutId, setWorkoutId] = useState(null);
    const [workoutObject, setWorkoutObject] = useState({});

    useEffect(() => {
        if (drawerState) {
            let startDate = new Date(drawerState.startDate);
            let endDate = new Date(drawerState.endDate);
            setStartDate(startDate);
            setEndDate(endDate)
            setOptions(Workouts)

        }

    },


        [drawerState],
    );

    console.log("workouts:", Workouts)


    const setDrawerIcons = () => {

        return (
            drawerState.workout.exercises.map((y, i) => {

                if (y.muscle_group_name == "Biceps") {
                    return (
                        <div className="w-full flex mb-6 shadow-md border border-gray-200 rounded-sm">
                            <div className="flex flex-none items-center">
                                <img src="/images/arms-icon.png" className="h-24 w-24" />
                            </div>
                            <div className="flex flex-grow text-center flex-col items-center">
                                <div className="w-full text-black p-1 bg-gray-200">
                                    <span>{y.Name}</span>
                                </div>
                                <div className="w-full flex justify-center p-1">
                                    <div className="flex-1 flex flex-col items-center  ">

                                        <span>Sets</span>
                                        <span>{y.sets}</span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center">

                                        <span>Reps</span>
                                        <span>{y.reps}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                } else if (y.muscle_group_name == "Chest") {
                    return (
                        <div className="w-full flex mb-6 shadow-md border border-gray-200 rounded-sm">
                            <div className="flex flex-none items-center">
                                <img src="/images/chest-icon.png" className="h-24 w-24" />
                            </div>
                            <div className="flex flex-grow text-center flex-col items-center">
                                <div className="w-full text-black p-1 bg-gray-200">
                                    <span>{y.Name}</span>
                                </div>
                                <div className="w-full flex justify-center p-1">
                                    <div className="flex-1 flex flex-col items-center  ">

                                        <span>Sets</span>
                                        <span>{y.sets}</span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center">

                                        <span>Reps</span>
                                        <span>{y.reps}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                } else if (y.muscle_group_name == "Abductors") {
                    return (
                        <div className="w-full flex mb-6 shadow-md border border-gray-200 rounded-sm">
                            <div className="flex flex-none items-center">
                                <img src="/images/legs-icon.png" className="h-24 w-24" />
                            </div>
                            <div className="flex flex-grow text-center flex-col items-center">
                                <div className="w-full text-black p-1 bg-gray-200">
                                    <span>{y.Name}</span>
                                </div>
                                <div className="w-full flex justify-center p-1">
                                    <div className="flex-1 flex flex-col items-center  ">

                                        <span>Sets</span>
                                        <span>{y.sets}</span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center">

                                        <span>Reps</span>
                                        <span>{y.reps}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                else if (y.muscle_group_name == "Aductors") {
                    return (
                        <div className="w-full flex mb-6 shadow-md border border-gray-200 rounded-sm">
                            <div className="flex flex-none items-center">
                                <img src="/images/legs-icon.png" className="h-24 w-24" />
                            </div>
                            <div className="flex flex-grow text-center flex-col items-center">
                                <div className="w-full text-black p-1 bg-gray-200">
                                    <span>{y.Name}</span>
                                </div>
                                <div className="w-full flex justify-center p-1">
                                    <div className="flex-1 flex flex-col items-center  ">

                                        <span>Sets</span>
                                        <span>{y.sets}</span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center">

                                        <span>Reps</span>
                                        <span>{y.reps}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                else if (y.muscle_group_name == "Triceps") {
                    return (
                        <div className="w-full flex mb-6 shadow-md border border-gray-200 rounded-sm">
                            <div className="flex flex-none items-center">
                                <img src="/images/arms-icon.png" className="h-24 w-24" />
                            </div>
                            <div className="flex flex-grow text-center flex-col items-center">
                                <div className="w-full text-black p-1 bg-gray-200">
                                    <span>{y.Name}</span>
                                </div>
                                <div className="w-full flex justify-center p-1">
                                    <div className="flex-1 flex flex-col items-center  ">

                                        <span>Sets</span>
                                        <span>{y.sets}</span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center">

                                        <span>Reps</span>
                                        <span>{y.reps}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }
                else if (y.muscle_group_name == "Abs") {
                    return (
                        <div className="w-full flex mb-6 shadow-md border border-gray-200 rounded-sm">
                            <div className="flex flex-none items-center">
                                <img src="/images/abs-icon.png" className="h-24 w-24" />
                            </div>
                            <div className="flex flex-grow text-center flex-col items-center">
                                <div className="w-full text-black p-1 bg-gray-200">
                                    <span>{y.Name}</span>
                                </div>
                                <div className="w-full flex justify-center p-1">
                                    <div className="flex-1 flex flex-col items-center  ">

                                        <span>Sets</span>
                                        <span>{y.sets}</span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center">

                                        <span>Reps</span>
                                        <span>{y.reps}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }
                else if (y.muscle_group_name == "Shoulders") {
                    return (
                        <div className="w-full flex mb-6 shadow-md border border-gray-200 rounded-sm">
                            <div className="flex flex-none items-center">
                                <img src="/images/shoulders-icon.png" className="h-24 w-24" />
                            </div>
                            <div className="flex flex-grow text-center flex-col items-center">
                                <div className="w-full text-black p-1 bg-gray-200">
                                    <span>{y.Name}</span>
                                </div>
                                <div className="w-full flex justify-center p-1">
                                    <div className="flex-1 flex flex-col items-center  ">

                                        <span>Sets</span>
                                        <span>{y.sets}</span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center">

                                        <span>Reps</span>
                                        <span>{y.reps}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                } else if (y.muscle_group_name == "Calves") {
                    return (
                        <div className="w-full flex mb-6 shadow-md border border-gray-200 rounded-sm">
                            <div className="flex flex-none items-center">
                                <img src="/images/cavles-icon.png" className="h-24 w-24" />
                            </div>
                            <div className="flex flex-grow text-center flex-col items-center">
                                <div className="w-full text-black p-1 bg-gray-200">
                                    <span>{y.Name}</span>
                                </div>
                                <div className="w-full flex justify-center p-1">
                                    <div className="flex-1 flex flex-col items-center  ">

                                        <span>Sets</span>
                                        <span>{y.sets}</span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center">

                                        <span>Reps</span>
                                        <span>{y.reps}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                else if (y.muscle_group_name == "Back") {
                    return (
                        <div className="w-full flex mb-6 shadow-md border border-gray-200 rounded-sm">
                            <div className="flex flex-none items-center">
                                <img src="/images/back-icon.png" className="h-24 w-24" />
                            </div>
                            <div className="flex flex-grow text-center flex-col items-center">
                                <div className="w-full text-black p-1 bg-gray-200">
                                    <span>{y.Name}</span>
                                </div>
                                <div className="w-full flex justify-center p-1">
                                    <div className="flex-1 flex flex-col items-center  ">

                                        <span>Sets</span>
                                        <span>{y.sets}</span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center">

                                        <span>Reps</span>
                                        <span>{y.reps}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                }
            }

            )
        )
    }

    const handleDelete = () => {
        Swal.fire({

            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: 'rgb(163, 163, 163)',
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                container: 'my-swal'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch({ type: "FILTER_APPOINTMENTS", id: drawerState.id });
                onClose()
                await fetch('http://localhost:9000/deleteAppointment', {
                    method: 'POST',
                    'credentials': 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: drawerState.id }),
                })

            }
        })
    }

    const handleEdit = async (e) => {
        e.preventDefault()

        dispatch({ type: "UPDATE_APPOINTMENT", startDate: startDate, endDate: endDate, AppointmentId: drawerState.id })
        setDrawerState(prevState => ({
            ...prevState,
            startDate: startDate,
            endDate: endDate
        }));
        let payload = {
            startDate: startDate,
            endDate: endDate,
            id: drawerState.id
        }
        await fetch('http://localhost:9000/updateAppointment', {
            method: 'POST',
            'credentials': 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payload: payload }),
        })


        setEditingDate(false)
    }


    const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
        <button className="border-2 border-gray rounded-sm shadow-sm w-auto px-1" onClick={onClick}
            ref={ref}>
            <Moment format="LLLL">{value}</Moment>

        </button>
    ));


    const NewContent = () => {

        if (choosingWorkout && !drawerState.workout) {
            return (
                <Select placeholder="Select option" className="w-1/2 " onChange={(e: any) => handleWorkoutChange(e)}>
                    {
                        Workouts.map((x) => (
                            <option value={x.WorkoutId}>{x.workout_name}</option>
                        ))
                    }


                </Select>

            )
        } else if (drawerState.workout && !choosingWorkout) {
            return (
                <WorkoutContent drawerState={drawerState} setDrawerState={setDrawerState} />
            )
        } else if (!drawerState.workout && !choosingWorkout) {
            return (

                <span className="text-[#649CEA] cursor-pointer hover:underline" onClick={() => setChoosingWorkout(true)}>Add Workout</span>
            )
        }
    }



    const handleWorkoutChange = async (e) => {
        if (!e.target.value) {
            console.log("none")
        }

        console.log(e.target.value)
        setWorkoutId(parseInt(e.target.value))
        let workout = Workouts.find(p => p.WorkoutId == e.target.value)
        console.log("workout:", workout)
        console.log("WORKOUT ID:", e.target.value)

        setDrawerState(prevState => ({
            ...prevState,
            workout: workout,
            WorkoutId: parseInt(e.target.value)
        }));

        await fetch('http://localhost:9000/updateAppointmentWorkout', {
            method: 'POST',
            'credentials': 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ WorkoutId: e.target.value, id: drawerState.id }),
        })
        dispatch({ type: "UPDATE_APPOINTMENT_WORKOUT", workout: workout, WorkoutId: parseInt(e.target.value), AppointmentId: drawerState.id });
        setChoosingWorkout(false)
    }


    return (
        <>
            {drawerState ? <Drawer onClose={onClose} isOpen={isOpen} size={size}>
                < DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader className="flex justify-end relative right-[20px]">
                        <IconButton aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={onClose}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </DrawerHeader>
                    <DrawerBody className=" flex flex-col items-center">
                        <div className="flex flex-row w-full items-center justify-center text-[#414141] mb-4 mt-4">

                            <span className="text-3xl">{drawerState.title}</span>
                        </div>
                        <div className="flex flex-row w-full items-center justify-center text-[#414141] mb-4 mt-4">

                            <img className="rounded-full shadow-md w-[100px] h-[100px]" src="/images/wes.jpg " />
                        </div>

                        {
                            editingDate ?
                                <>
                                    {/* Start Date */}
                                    < span className="mb-1 font-medium mt-2">Start Date</span>
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
                                    <div className="flex flex-row w-full items-center justify-center text-[#414141] mb-3">
                                        <span className="text-gray-300 cursor-pointer hover:underline py-1 mx-3" onClick={() => {
                                            setEditingDate(false)
                                            // setWorkoutId(null)
                                            // setWorkoutObject({})

                                        }
                                        }>Cancel</span>
                                        <span className="text-[#649CEA] cursor-pointer hover:underline" onClick={(e: any) => handleEdit(e)} >Save</span>

                                    </div>
                                </>
                                : <> <div className="flex flex-row w-full items-center justify-center text-[#414141] mb-4 mt-4">
                                    <FaRegCalendar className="mr-2 text-xl" />
                                    <Moment className="text-xl" format="dddd, MMMM Do YYYY">{drawerState.startDate}</Moment>

                                </div>
                                    <div className="flex flex-row w-full items-center justify-center text-[#414141] mb-4 mt-4">
                                        <FiClock className="mr-2 text-xl" />

                                        <Moment className="text-xl mr-1" date={drawerState.startDate} format="hh:mm A" /> - <Moment className="text-xl ml-1" date={drawerState.endDate} format="hh:mm A" />
                                    </div>
                                    <div className="flex flex-row w-full items-center justify-center text-[#414141] mb-4 mt-4">
                                        <span className="text-[#649CEA] cursor-pointer hover:underline" onClick={() => setEditingDate(true)}>Edit Date & Time</span>
                                    </div>
                                </>
                        }

                        <div className="flex flex-row w-full items-center justify-center text-[#414141] mt-2">
                            <span className="text-2xl">Workout</span>


                        </div>
                        <div className="flex flex-col w-full items-center justify-center text-[#414141] mt-3">

                            {/* 
                            {drawerState.workout
                                ?
                                <WorkoutContent drawerState={drawerState} /> :


                                <span className="text-[#649CEA] cursor-pointer hover:underline" onClick={() => setChoosingWorkout(true)}>Add Workout</span> :
                            <Select placeholder="Select option">
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </Select>


                            } */}
                            {NewContent()}

                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer > : null
            }

        </>
    )
}
