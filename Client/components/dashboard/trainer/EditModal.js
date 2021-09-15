
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"
import {
    Input,
    InputGroup,
    InputLeftElement,
    Button
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import React, { useRef, useState, useReducer, useEffect } from "react"
import styles from "../../../styles/dashboard/ProgramsTab.module.scss"
import { MdClose } from 'react-icons/md';
import List from "./List"
// import useSWR from 'swr'



export default function EditModal({ workoutState, open, setOpen, workoutDispatch, exerciseState, myWorkoutsDispatch }) {
    const [term, setTerm] = useState("")
    const [arr, setArr] = useState(workoutState.workout.exercises)
    const [workout_name, setName] = useState(workoutState.workout.workout_name)
    const [focused, setFocused] = useState(false)


    useEffect(() => {
        setName(workoutState.workout.workout_name)

    }, [workoutState.workout.workout_name])

    const AddToEditList = (Exercise) => {
        workoutDispatch({ type: "ADD", Exercise: Exercise });
        setTerm("")
    }


    const deleteFromList = (ExerciseId) => {
        workoutDispatch({ type: "FILTER", ExerciseId: ExerciseId });
    }

    const Clear = () => {
        setOpen(false)
    }


    const SendEditedWorkout = async () => {
        console.log("STATE", workoutState)
        if (workout_name === "" || undefined || null) {
            return
        } else {


            const res = await fetch('https://apextraining.herokuapp.com/updateWorkout', {
                method: 'POST',
                'credentials': 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ exercises: workoutState.workout.exercises, WorkoutId: workoutState.workout.WorkoutId, workout_name: workout_name }),
            })

            const { data, status } = await res.json()
            console.log("data", data.workout)

            myWorkoutsDispatch({ type: "CHANGED", workout: data.workout });
            Clear()
        }
    }




    const editName = (value) => {
        setName(value)


    }


    return (
        <>

            <Modal
                isCentered
                onClose={Clear}
                isOpen={open}
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Workout</ModalHeader>
                    <ModalCloseButton onClick={Clear} />
                    <ModalBody >

                        <Input type="tel" placeholder="Name" style={{ marginBottom: "30px" }} value={workout_name} onChange={(e) => setName(e.target.value)} />

                        <InputGroup style={{ marginBottom: "30px", position: "relative" }} className={styles.group}>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<SearchIcon color="gray.300" />}
                            />
                            <Input onFocus={() => {
                                setFocused(true)
                            }} onBlur={() => {
                                setTimeout(() => {
                                    setFocused(false)
                                }, 240)
                            }} type="tel" placeholder="Exercises" value={term} onChange={(e) => setTerm(e.target.value)} />

                            {focused && <div className={styles.list} style={{ position: "absolute", backgroundColor: "white", top: "50px", width: "100%", zIndex: "100", maxHeight: "300px", overflowY: "auto" }}>
                                <List exerciseState={exerciseState} term={term} open={open} AddToEditList={AddToEditList} />

                            </div>}
                        </InputGroup>

                        <div className={styles.exercise_list}>

                            {/* make list component */}
                            {
                                open ? workoutState.workout.exercises.map((listItem) => (
                                    <div className={styles.exercise}>
                                        <span> {listItem.Name}</span>
                                        <span onClick={() => deleteFromList(listItem.ExerciseId)}><MdClose /></span>
                                    </div>
                                )) : null
                            }

                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ marginRight: "6px" }} variant="ghost" onClick={() => Clear()}>Close</Button>
                        <Button colorScheme="red" mr={3} onClick={() => SendEditedWorkout()}>
                            Save
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
