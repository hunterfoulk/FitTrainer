import React, { useState, useReducer } from 'react'
import styles from "../styles/dashboard/ProgramsTab.module.scss"
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Add from '@material-ui/icons/Add';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Input } from "@chakra-ui/react"
import { InputGroup } from "@chakra-ui/react"
import { InputLeftElement } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { useDisclosure } from "@chakra-ui/react"
import Modal from "../components/dashboard/trainer/ProgramsModal"
import requireAuthentication from "./auth/authtwo"
import Topbar from "../components/dashboard/topbar"
import stylesTwo from "../styles/dashboard/Dashboard.module.scss"
import Layout from "../components/layout"
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2'
import EditModal from "../components/dashboard/trainer/EditModal"
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import ExerciseTab from "../components/dashboard/trainer/exerciseTab"
import { IoMdRefresh } from 'react-icons/io';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
            outline: "none"
        },
    }),
);




const reducer = (state, action) => {
    console.log("FIRED", action)
    switch (action.type) {

        case "UPDATE":
            return {
                ...state,
                workouts: [...state.workouts, action.workout]
            };
        case "FILTER":
            return {
                ...state,
                workouts: state.workouts.filter((item, i) => i !== action.i),
            };
        case "CHANGED":
            return {
                ...state,
                workouts: state.workouts.map(workout => (action.workout.WorkoutId === workout.WorkoutId ? { ...workout, ...action.workout } : workout))
            }

        default:
            return state;
    }
};



const workoutReducer = (state, action) => {
    console.log("FIRED", action)
    switch (action.type) {

        case "SET":
            return {
                ...state,
                workout: action.workout
            };
        case "FILTER":
            return {
                ...state,
                workout: {
                    ...state.workout,
                    exercises: state.workout.exercises.filter((exercises, i) => exercises.ExerciseId !== action.ExerciseId)
                },
            };
        case "ADD":
            return {
                ...state,
                workout: {
                    ...state.workout,
                    exercises: [...state.workout.exercises, action.Exercise]

                },

            }
        case "CHANGE_WORKOUT_NAME":
            return {
                ...state,
                workout: {
                    ...state.workout,
                    workout_name: action.workout_name
                }
            }

        default:
            return state;
    }
};

const exerciseReducer = (state, action) => {
    console.log("FIRED", action)
    switch (action.type) {

        case "UPDATE":
            return {
                ...state,
                exercises: [...state.exercises, action.newExercise]
            };

        default:
            return state;
    }
};




const Programs = ({ AccountInfo, exerciseList, role, workouts, equipment, muscle_groups }) => {
    const [tab, setTab] = useState<string>("Home")
    const classes = useStyles();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialState = { workouts: workouts };
    const _workoutState = { workout: {} };
    const _exerciseState = { exercises: exerciseList };
    const [state, dispatch] = useReducer(reducer, initialState);
    const [workoutState, workoutDispatch] = useReducer(workoutReducer, _workoutState);
    const [exerciseState, exerciseDispatch] = useReducer(exerciseReducer, _exerciseState);
    const [open, setOpen] = useState(false)
    const [exerciseTerm, setExerciseTerm] = useState("")
    const [workoutTerm, setWorkoutTerm] = useState("")



    return (
        <>

            <Layout AccountInfo={AccountInfo} role={role}>
                <motion.div className={styles.programs_tab_main} >
                    <EditModal workoutState={workoutState} open={open} setOpen={setOpen} workoutDispatch={workoutDispatch} exerciseState={exerciseState} myWorkoutsDispatch={dispatch} />
                    <Modal onOpen={onOpen} onClose={onClose} isOpen={isOpen} exerciseState={exerciseState} exerciseDispatch={exerciseDispatch} AccountInfo={AccountInfo} workoutDispatch={dispatch} tab={tab} equipment={equipment} muscle_groups={muscle_groups} />
                    <div className={styles.programs_tab_header}>
                        <h1>{tab === "Home" ? "Programs" : "Exercises"}</h1>
                        {tab === "Home" &&

                            <Button onClick={() => setTab("Back")}
                                variant="contained"
                                color="secondary"
                                style={{ outline: "none" }}
                                className={classes.button}

                            >
                                Exercise List
                            </Button>


                        }
                        {tab === "Back" && <> <Button onClick={() => setTab("Home")}
                            variant="contained"
                            color="secondary"
                            style={{ outline: "none" }}
                            className={classes.button}
                        >
                            Porgrams List
                        </Button> </>
                        }
                    </div>

                    <div className={styles.programs_tab_buttons}>
                        {tab === "Home" ? <Button
                            onClick={onOpen}
                            variant="contained"
                            color="secondary"
                            style={{ outline: "none" }}
                            className={classes.button}

                        >
                            Create Program
                        </Button> :
                            <>
                                <Button
                                    onClick={onOpen}
                                    variant="contained"
                                    color="secondary"
                                    style={{ outline: "none" }}
                                    className={classes.button}

                                >
                                    Create Exercise
                                </Button>

                            </>
                        }
                    </div>

                    <div className={styles.programs_tab_input}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<SearchIcon color="gray.300" />}
                            />
                            {tab === "Home" ? <Input value={workoutTerm} type="tel" placeholder="Search Workouts By Name..." onChange={(e) => {
                                setWorkoutTerm(e.target.value)
                            }} /> : <Input value={exerciseTerm} type="tel" placeholder="Search Exercise By Name..." onChange={(e) => {
                                setExerciseTerm(e.target.value)
                            }} />}
                        </InputGroup>
                    </div>

                    {tab === "Home" ? <motion.div className={styles.content_container} initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} transition={{ duration: 0.3 }}>
                        <div className={styles.row_header}>
                            <div>
                                <span>Name</span>
                            </div>
                            <div>
                                <span>Exercises</span>
                            </div>
                            <div>
                                <span>Date Created</span>
                            </div>
                            <div>
                                <span>Edit</span>

                            </div>
                        </div>

                        {state.workouts.map((workout: any, index) => {
                            let myDate = workout.JoinDate.split(' ')[0]

                            return (
                                <div className={styles.workout}>
                                    <div>
                                        <span>{workout.workout_name}</span>
                                    </div>
                                    <div>
                                        {workout.exercises.map((exercise: any) => (
                                            <>
                                                <span className={styles.exercise}>{exercise.Name}</span>

                                            </>
                                        ))}

                                    </div>

                                    <div>
                                        <span>{myDate}</span>
                                    </div>

                                    <div className={styles.edit_container}>
                                        <IconButton style={{ outline: "none" }} aria-label="edit" onClick={async () => {
                                            await workoutDispatch({ type: "SET", workout: workout });
                                            setOpen(true)

                                        }}>
                                            <EditIcon style={{ color: "#031d33", outline: "none" }} />
                                        </IconButton>
                                        <IconButton style={{ outline: "none" }} aria-label="delete" onClick={() => {
                                            Swal.fire({
                                                title: 'Are you sure?',
                                                text: "You won't be able to revert this!",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Yes, delete it!'
                                            }).then(async (result) => {
                                                if (result.isConfirmed) {
                                                    dispatch({ type: "FILTER", i: index });
                                                    //DELETE PROGRAMS
                                                    await fetch('http://localhost:9000/deleteWorkout', {
                                                        method: 'POST',
                                                        'credentials': 'include',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                        },
                                                        body: JSON.stringify({ WorkoutId: workout.WorkoutId }),
                                                    })
                                                }
                                            })
                                        }}>
                                            <DeleteIcon style={{ color: "#ea2537", outline: "none" }} />
                                        </IconButton>

                                    </div>
                                </div>
                            )
                        })}

                    </motion.div> : <ExerciseTab exerciseState={exerciseState} exerciseDispatch={exerciseDispatch} exerciseTerm={exerciseTerm} muscle_groups={muscle_groups} equipment={equipment} />}


                </motion.div>

            </Layout>
        </>
    )
}

export default Programs


export const getServerSideProps = requireAuthentication(async context => {


    let cookie = context.req?.headers.cookie
    const response = await fetch('http://localhost:9000/trainersPrograms', {
        headers: {
            cookie: cookie!
        }
    });
    const res = await response.json()
    console.log("RESPONSE FOR PROGRAMS", res)

    return {
        props: {
            exerciseList: res.data.exerciseList,
            AccountInfo: res.data.AccountInfo,
            role: res.data.role,
            workouts: res.data.workouts,
            muscle_groups: res.data.muscle_groups,
            equipment: res.data.equipment

        },
    }
})


