import React, { useState, useReducer, useEffect } from 'react'
import styles from "../styles/dashboard/ProgramsTab.module.scss"
import ArrowBack from '@material-ui/icons/ArrowBack';
import Add from '@material-ui/icons/Add';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import { SearchIcon } from "@chakra-ui/icons"
import { useDisclosure } from "@chakra-ui/react"
import Modal from "../components/dashboard/trainer/ProgramsModal"
import requireAuthentication from "./auth/authtwo"
import Layout from "../components/layout"
import EditModal from "../components/dashboard/trainer/EditModal"
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import ExerciseTab from "../components/dashboard/trainer/exerciseTab"
import WorkoutsTab from "../components/dashboard/trainer/workoutsTab"
import { IoAddCircle } from 'react-icons/io5';
import { TiDelete } from 'react-icons/ti';
import {
    Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, InputGroup, Input, InputLeftElement, NumberIncrementStepper,
    NumberDecrementStepper, NumberInput,
    NumberInputField,
    NumberInputStepper,
} from "@chakra-ui/react"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TrainersWorkoutList from "../components/dashboard/trainer/trainersWorkoutList"
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
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

}));


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
                workouts: state.workouts.filter((item, i) => item.WorkoutId !== action.id),
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


const createWorkoutReducer = (state, action) => {
    console.log("CREATE WORKOUT REDUCER FIRED", action)
    switch (action.type) {

        case "ADD":
            return {
                ...state,
                workoutExerciseList: [...state.workoutExerciseList, action.exercise]
            };

        case "DELETE":
            return {
                ...state,
                workoutExerciseList: state.workoutExerciseList.filter(x => x.ExerciseId != action.ExerciseId)
            };
        case "CLEAR":
            return {
                ...state,
                workoutExerciseList: []
            };
        case "INCREMENT_SETS":
            return {
                ...state,
                workoutExerciseList: state.workoutExerciseList.map((x) => x.ExerciseId == action.ExerciseId ? { ...x, sets: x.sets + 1 } : x)
            };
        case "INCREMENT_REPS":
            return {
                ...state,
                workoutExerciseList: state.workoutExerciseList.map((x) => x.ExerciseId == action.ExerciseId ? { ...x, reps: x.reps + 1 } : x)
            };
        case "DECREMENT_SETS":
            return {
                ...state,
                workoutExerciseList: state.workoutExerciseList.map((x) => x.ExerciseId == action.ExerciseId ? { ...x, sets: x.sets == 0 ? 0 : x.sets - 1 } : x)
            };
        case "DECREMENT_REPS":
            return {
                ...state,
                workoutExerciseList: state.workoutExerciseList.map((x) => x.ExerciseId == action.ExerciseId ? { ...x, reps: x.reps == 0 ? 0 : x.reps - 1 } : x)
            };
        case "SET_WORKOUT_NAME":
            return {
                ...state,
                workout_name: action.payload
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
    const _workoutExerciseList = { workoutExerciseList: [], workout_name: "" };
    const [state, dispatch] = useReducer(reducer, initialState);
    const [workoutState, workoutDispatch] = useReducer(workoutReducer, _workoutState);
    const [exerciseState, exerciseDispatch] = useReducer(exerciseReducer, _exerciseState);
    const [creatingWorkoutState, creatingWorkoutDispatch] = useReducer(createWorkoutReducer, _workoutExerciseList);
    const [open, setOpen] = useState(false)
    const [exerciseTerm, setExerciseTerm] = useState("")
    const [workoutTerm, setWorkoutTerm] = useState("")
    const [term, setTerm] = useState("")


    const ContentHeaderButton = () => {
        if (tab === "Home") {
            return (
                <Button
                    onClick={() => setTab("Create")}
                    variant="contained"
                    color="secondary"
                    style={{ outline: "none" }}


                >
                    Create Workout
                </Button>
            )
        } else if (tab === "Back") {
            return (
                <Button
                    onClick={onOpen}
                    variant="contained"
                    color="secondary"
                    style={{ outline: "none" }}


                >
                    Create Exercise
                </Button>

            )
        } else if (tab === "Create") {
            return null
        }
    }

    const ContentBar = () => {
        if (tab === "Home") {
            return (
                <div className={styles.programs_tab_input}>
                    <InputGroup className="bg-white">
                        <InputLeftElement

                            pointerEvents="none"
                            children={<SearchIcon color="gray.300" />}
                        />
                        <Input className="bg-white" value={workoutTerm} type="tel" placeholder="Search Workouts By Name..." onChange={(e) => {
                            setWorkoutTerm(e.target.value)
                        }} />
                    </InputGroup>
                </div>
            )
        } else if (tab === "Back") {
            return (
                <div className={styles.programs_tab_input}>
                    <InputGroup className="bg-white">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<SearchIcon color="gray.300" />}
                        />
                        <Input value={exerciseTerm} type="tel" placeholder="Search Exercise By Name..." onChange={(e) => {
                            setExerciseTerm(e.target.value)
                        }} />
                    </InputGroup>
                </div>
            )
        } else if (tab === "Create") {
            return (
                <div className={styles.programs_tab_input}>

                    <InputGroup className="bg-white">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<SearchIcon color="gray.300" />}
                        />
                        <Input value={term} type="tel" placeholder="Search Exercises To Add..." onChange={(e) => {
                            setTerm(e.target.value)
                        }} />
                    </InputGroup>
                </div>
            )
        }
    }

    const ContentHeader = () => {
        <h1>{tab === "Home" ? "Workouts" : "Exercises"}</h1>
        if (tab === "Home") {
            return <h1>Workouts</h1>
        } else if (tab === "Back") {
            return <h1>Exercises</h1>
        } else if (tab === "Create") {
            return <h1>Create Workout</h1>

        }
    }

    const ContentButtons = () => {
        if (tab === "Home") {

            return (<Button onClick={() => setTab("Back")}
                variant="contained"
                color="secondary"
                style={{ outline: "none" }}


            >
                Exercise List
            </Button>
            )

        } else if (tab === "Back") {
            return (
                <Button onClick={() => setTab("Home")}
                    variant="contained"
                    color="secondary"
                    style={{ outline: "none" }}

                >
                    Workout List
                </Button>
            )
        } else if (tab === "Create") {
            return (
                <Button onClick={() => setTab("Home")}
                    variant="contained"
                    color="secondary"
                    style={{ outline: "none" }}

                >
                    Workout List
                </Button>
            )
        }
    }


    const ExerciseTable = () => {

        const addExerciseToWorkoutList = (exercise) => {
            const item = creatingWorkoutState.workoutExerciseList.some(x => x.ExerciseId == exercise.ExerciseId)

            if (item) {
                return
            } else {
                exercise.reps = 0
                exercise.sets = 0
                creatingWorkoutDispatch({ type: "ADD", exercise: exercise })
            }


        }

        return (

            exerciseList.filter(item => item.Name.toLowerCase().includes(term.toLowerCase())).map((exercise, i) => {

                return (

                    <tr>
                        <td className="w-1/3 text-left py-3 px-4">{exercise.Name}</td>
                        <td className="w-1/3 text-left py-3 px-4" style={{ textAlign: "center" }}>{exercise.muscle_group_name}</td>
                        <td className="py-3 px-4 flex items-end justify-end" style={{ textAlign: "right" }}><IoAddCircle onClick={() => addExerciseToWorkoutList(exercise)} style={{ textAlign: "right" }} className="relative cursor-pointer right-0 hover:text-blue-500 text-2xl" /></td>
                    </tr>
                )
            })

        )
    }



    const Content = () => {



        const handleWorkoutSave = async () => {
            if (creatingWorkoutState.workout_name) {


                let res = await fetch('http://localhost:9000/createWorkout', {
                    method: 'POST',
                    'credentials': 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ exercises: creatingWorkoutState.workoutExerciseList, workout_name: creatingWorkoutState.workout_name, TrainerId: AccountInfo.TrainerId, exerciseList: exerciseList }),
                })

                const { data, status } = await res.json() as any
                console.log("data workout", data.workout)
                dispatch({ type: "UPDATE", workout: data.workout })

            } else {
                return
            }
        }



        if (tab === "Create") {
            return (
                <>
                    <div className="flex w-full max-w-[1400px] mt-4 p-2">
                        <div className="flex w-2/3">


                            <div className="shadow-lg overflow-hidden rounded border-b border-gray-200 w-full">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Exercise</th>
                                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm" style={{ textAlign: "center" }}>Muscle Group</th>
                                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-right" style={{ textAlign: "right" }} >Add</th>

                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {ExerciseTable()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex w-1/3 flex flex-col items-center px-2">
                            <div className="w-full flex flex-col items-center shadow-md rounded bg-white">
                                <div className="w-full flex justify-center text-lg font-semibold bg-[#1F2937] text-white p-1 rounded-t">
                                    <h1>Workout</h1>
                                </div>


                                {
                                    creatingWorkoutState.workoutExerciseList.length ? <motion.div dragElastic={0.1} className="w-full flex flex-col px-2 py-2 ">
                                        <div className="flex items-center border-b border-b-2 border-teal-500 py-2 mb-3">
                                            <input onChange={(e) => creatingWorkoutDispatch({ type: "SET_WORKOUT_NAME", payload: e.target.value })} className="bg-transparent border-none mr-3 px-2 leading-tight focus:outline-none" type="text" placeholder="Workout Name..." />


                                        </div>
                                        {creatingWorkoutState.workoutExerciseList.map((exercise, index) => (
                                            <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} transition={{ duration: 0.2 }} exit={{ opacity: [1, 0] }} className="w-full flex flex-col mb-2 py-1 shadow-md border border-gray-100 rounded-sm">

                                                <div className="w-full text-center">
                                                    <span className="text-md font-semibold">{exercise.Name}</span>
                                                </div>
                                                <div className="w-full flex flex-row ">
                                                    <div className="flex flex-1 items-end flex-col px-2 py-1">
                                                        <div className="text-center max-w-[60px]">
                                                            <span className="text-center">Sets</span>
                                                            <NumberInput className="border-none" size="xs" maxW={16} defaultValue={exercise.sets} min={0}  >
                                                                <NumberInputField />
                                                                <NumberInputStepper>
                                                                    <NumberIncrementStepper onClick={() => creatingWorkoutDispatch({ type: "INCREMENT_SETS", ExerciseId: exercise.ExerciseId })} />
                                                                    <NumberDecrementStepper onClick={() => creatingWorkoutDispatch({ type: "DECREMENT_SETS", ExerciseId: exercise.ExerciseId })} />
                                                                </NumberInputStepper>
                                                            </NumberInput>
                                                        </div>

                                                    </div>
                                                    <div className="flex flex-1 justify-center flex-col px-2 py-1">
                                                        <div className="text-center max-w-[60px]">
                                                            <span>Reps</span>
                                                            <NumberInput size="xs" maxW={16} defaultValue={exercise.reps} min={0} >
                                                                <NumberInputField />
                                                                <NumberInputStepper>
                                                                    <NumberIncrementStepper onClick={() => creatingWorkoutDispatch({ type: "INCREMENT_REPS", ExerciseId: exercise.ExerciseId })} />
                                                                    <NumberDecrementStepper onClick={() => creatingWorkoutDispatch({ type: "DECREMENT_REPS", ExerciseId: exercise.ExerciseId })} />
                                                                </NumberInputStepper>
                                                            </NumberInput>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="flex w-full justify-center mt-2">
                                                    <TiDelete className="text-2xl cursor-pointer" onClick={() => creatingWorkoutDispatch({ type: "DELETE", ExerciseId: exercise.ExerciseId })} />
                                                </div>
                                            </motion.div>
                                        ))}
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} transition={{ duration: 0.2 }} className="w-full flex justify-center">
                                            <Button
                                                onClick={() => creatingWorkoutDispatch({ type: "CLEAR" })}
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                className={classes.buttontwo}
                                                startIcon={<RefreshIcon />}
                                            >
                                                Clear
                                            </Button>
                                            <Button
                                                onClick={() => handleWorkoutSave()}
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                className={classes.button}
                                                startIcon={<SaveIcon />}
                                            >
                                                Save
                                            </Button>
                                        </motion.div>
                                    </motion.div>

                                        : <h1 className="p-2 text-lg text-semibold">Add an exercise.</h1>
                                }

                            </div>



                        </div>


                    </div>
                </>
            )
        } else if (tab === "Home") {
            return (


                <WorkoutsTab workouts={state.workouts} dispatch={dispatch} />


            )
        } else if (tab === "Back") {
            return (
                <ExerciseTab exerciseState={exerciseState} exerciseDispatch={exerciseDispatch} exerciseTerm={exerciseTerm} muscle_groups={muscle_groups} equipment={equipment} />
            )
        }
    }


    return (
        <>

            <Layout AccountInfo={AccountInfo} role={role}>
                <motion.div className={styles.programs_tab_main} >
                    {/* MODALS */}
                    <EditModal workoutState={workoutState} open={open} setOpen={setOpen} workoutDispatch={workoutDispatch} exerciseState={exerciseState} myWorkoutsDispatch={dispatch} />
                    <Modal onOpen={onOpen} onClose={onClose} isOpen={isOpen} exerciseState={exerciseState} exerciseDispatch={exerciseDispatch} AccountInfo={AccountInfo} workoutDispatch={dispatch} tab={tab} equipment={equipment} muscle_groups={muscle_groups} />
                    {/* MODALS */}

                    <div className={styles.programs_tab_header}>
                        {ContentHeader()}
                        {ContentButtons()}
                    </div>




                    <div className={styles.programs_tab_buttons}>
                        {ContentHeaderButton()}
                    </div>


                    {ContentBar()}

                    {Content()}

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

