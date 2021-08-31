import React, { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css'
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 600,
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: "#ee2b45",
        "&:hover": {
            backgroundColor: '#eb2b34'
        }
    },
    buttontwo: {
        margin: theme.spacing(1),
        backgroundColor: "rgb(185, 185, 185)",
        "&:hover": {
            backgroundColor: 'rgb(163, 163, 163)'
        }
    },
    buttonthree: {

        backgroundColor: "rgb(185, 185, 185)",
        "&:hover": {
            backgroundColor: 'rgb(163, 163, 163)'
        },
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0",
        height: "40px",
        width: "40px",
        maxWidth: "40px",
        fontSize: "20px"
    },

}));

export default function WorkoutsTab({ workouts, dispatch }) {
    const classes = useStyles();
    const [size, setSize] = React.useState("md")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modalState, setModalState] = useState(undefined)


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
                dispatch({ type: "FILTER", id: modalState.WorkoutId });
                onClose()
                await fetch('http://localhost:9000/deleteWorkout', {
                    method: 'POST',
                    'credentials': 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ WorkoutId: modalState.WorkoutId }),
                })

            }
        })
    }
    const handleClick = (workout) => {
        setModalState(workout)
        setSize("md")
        onOpen()
    }

    const setIcons = (workout: any) => {
        console.log("workouts fired shit")

        return (
            workout.exercises.map((y, i) => {

                if (y.muscle_group_name == "Biceps") {
                    return (
                        <Tooltip
                            // options
                            title={y.Name}
                            position="bottom"
                            trigger="mouseenter"
                        >
                            <img className="relative inline object-cover w-9 h-9 border-2 border-gray-300 rounded-full shadow-md" src="/images/arms-icon.png" alt="Profile image" style={{ zIndex: i * 10 }} />
                        </Tooltip>
                    )
                } else if (y.muscle_group_name == "Chest") {
                    return (
                        <Tooltip
                            // options
                            title={y.Name}
                            position="bottom"
                            trigger="mouseenter"
                        >
                            <img className="relative inline object-cover w-9 h-9 border-2 border-black rounded-full shadow-md" src="/images/chest-icon.png" alt="Profile image" style={{ zIndex: i * 10 }} />
                        </Tooltip>
                    )
                } else if (y.muscle_group_name == "Abductors") {
                    return (
                        <Tooltip
                            // options
                            title={y.Name}
                            position="bottom"
                            trigger="mouseenter"
                        >
                            <img className="relative inline object-cover w-9 h-9 border-2 border-black rounded-full shadow-md" src="/images/legs-icon.png" alt="Profile image" style={{ zIndex: i * 10 }} />
                        </Tooltip>
                    )
                }
                else if (y.muscle_group_name == "Aductors") {
                    return (
                        <Tooltip
                            // options
                            title={y.Name}
                            position="bottom"
                            trigger="mouseenter"
                        >
                            <img className="relative inline object-cover w-9 h-9 border-2 border-black rounded-full shadow-md" src="/images/legs-icon.png" alt="Profile image" style={{ zIndex: i * 10 }} />
                        </Tooltip>
                    )
                }
                else if (y.muscle_group_name == "Triceps") {
                    return (
                        <Tooltip
                            // options
                            title={y.Name}
                            position="bottom"
                            trigger="mouseenter"
                        >
                            <img className="relative inline object-cover w-9 h-9 border-2 border-gray-300 rounded-full shadow-md" src="/images/arms-icon.png" alt="Profile image" style={{ zIndex: i * 10 }} />
                        </Tooltip>
                    )
                }
                else if (y.muscle_group_name == "Abs") {
                    return (
                        <Tooltip
                            // options
                            title={y.Name}
                            position="bottom"
                            trigger="mouseenter"
                        >
                            <img className="relative inline object-cover w-9 h-9 border-2 border-gray-300 rounded-full shadow-md" src="/images/abs-icon.png" alt="Profile image" style={{ zIndex: i * 10 }} />
                        </Tooltip>
                    )
                }
                else if (y.muscle_group_name == "Shoulders") {
                    return (
                        <Tooltip
                            // options
                            title={y.Name}
                            position="bottom"
                            trigger="mouseenter"
                        >
                            <img className="relative inline object-cover w-9 h-9 border-2 border-gray-300 rounded-full shadow-md" src="/images/shoulders-icon.png" alt="Profile image" style={{ zIndex: i * 10 }} />
                        </Tooltip>
                    )
                } else if (y.muscle_group_name == "Calves") {
                    return (
                        <Tooltip
                            // options
                            title={y.Name}
                            position="bottom"
                            trigger="mouseenter"
                        >
                            <img className="relative inline object-cover w-9 h-9 border-2 border-gray-300 rounded-full shadow-md" src="/images/calves-icon.png" alt="Profile image" style={{ zIndex: i * 10 }} />
                        </Tooltip>
                    )
                }
                else if (y.muscle_group_name == "Back") {
                    return (
                        <Tooltip
                            // options
                            title={y.Name}
                            position="bottom"
                            trigger="mouseenter"
                        >
                            <img className="relative inline object-cover w-9 h-9 border-2 border-gray-300 rounded-full shadow-md" src="/images/back-icon.png" alt="Profile image" style={{ zIndex: i * 10 }} />
                        </Tooltip>
                    )
                }
            }

            )
        )

    }

    const setDrawerIcons = () => {

        return (
            modalState.exercises.map((y, i) => {

                if (y.muscle_group_name == "Biceps") {
                    return (
                        <div className="w-full flex mb-6 shadow-md border border-gray-200 rounded-sm">
                            <div className="flex flex-none items-center">
                                <img src="/images/arms-icon.png" className="h-20 w-20 shadow-md " />
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
                                <img src="/images/chest-icon.png" className="h-20 w-20" />
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
                                <img src="/images/legs-icon.png" className="h-20 w-20" />
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
                                <img src="/images/legs-icon.png" className="h-20 w-20" />
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
                                <img src="/images/arms-icon.png" className="h-20 w-20" />
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
                                <img src="/images/abs-icon.png" className="h-20 w-20" />
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
                                <img src="/images/shoulders-icon.png" className="h-20 w-20" />
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
                                <img src="/images/cavles-icon.png" className="h-20 w-20" />
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
                                <img src="/images/back-icon.png" className="h-20 w-20" />
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

    return (
        <>
            {modalState ? <Drawer onClose={onClose} isOpen={isOpen} size={size} >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader className="flex justify-end">
                        <IconButton aria-label="delete" onClick={onClose}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </DrawerHeader>
                    <DrawerBody className=" flex flex-col items-center">
                        <div className="flex justify-center text-3xl font-medium">
                            <h1>{modalState.workout_name}</h1>
                        </div>
                        <div className="flex justify-center text-lg font-medium mt-6">
                            <h1>Exercises</h1>
                        </div>
                        <div className="w-[90%] flex flex-col items-center justify-around text-lg font-medium mt-6">
                            {setDrawerIcons()}
                            <IconButton aria-label="delete" onClick={() => handleDelete()} className="relative left-[20px] top-[5px]">
                                <DeleteIcon fontSize="large" />
                            </IconButton>
                        </div>
                        <div className="w-[90%] flex justify-center">

                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer> : null}

            <div className="flex w-full max-w-[1400px] p-1 justify-around flex-wrap mt-6">
                {workouts.map((x: any) => (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} transition={{ duration: 0.3 }} className="px-2 w-[350px] shadow-lg rounded-md bg-white mb-4 border-[#010102] border-t-8">
                        <div className="w-full flex flex-row mt-2">
                            <div className=" flex flex-none items-center">
                                <img src="/images/workouts_default.png" className="h-[80px] w-[80px]" />
                            </div>
                            <div className="flex flex-grow flex-col items-center justify-around px-1 py-2">
                                <div className="w-full flex flex-col items-center mb-2 py-1">

                                    <span className="text-xl font-medium mb-1">{x.workout_name}</span>
                                </div>

                                <div className="w-full flex flex-col text-md text-gray-500 items-center mb-2 py-1">
                                    {/* <span className="mb-2">Exercises</span> */}
                                    <div className="-space-x-2 mb-2">

                                        {setIcons(x)}
                                    </div>

                                </div>

                                <div className="flex items-end justify-end mt-1 text-[#649CEA] cursor-pointer hover:underline">
                                    <span onClick={() => {
                                        handleClick(x)
                                    }}>View More</span>




                                </div>

                            </div>


                        </div>

                        {/* <div id="exercises" className="exercises flex flex-col items-center mt-2 max-h-[400px] overflow-y-auto">
                            {x.exercises.map((y) => (
                                <div className="w-[80%] mb-2 p-1 border border-gray-100 flex flex-col items-center ">
                                    <div className="flex w-full justify-center py-1">
                                        <span className="text-md font-medium">{y.Name}</span>
                                    </div>
                                    <div className="flex w-full jsutify-center">
                                        <div className=" w-full items-center flex flex-col">
                                            <span className="mb-1">Sets</span>
                                            <img src="images/sets.png" className="h-[30px] w-[30px] mb-1" />
                                            <span>{y.sets}</span>
                                        </div>
                                        <div className="w-full items-center flex flex-col">
                                            <span className="mb-1">Reps</span>
                                            <img src="images/reps.png" className="h-[30px] w-[30px] mb-1" />
                                            <span>{y.reps}</span>
                                        </div>
                                    </div>

                                </div>
                            ))}

                        </div> */}
                        {/* <div className="w-full flex justify-center py-1">
                            <Button

                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.buttontwo}
                                startIcon={<EditIcon />}
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => handleDelete(x.WorkoutId)}
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                            >
                                Delete
                            </Button>
                        </div> */}
                    </motion.div>
                ))}
            </div>
        </>
    )

}
