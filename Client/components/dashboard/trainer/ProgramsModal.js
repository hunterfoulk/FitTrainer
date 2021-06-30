
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
import CreateExercise from "./CreateExercise"


const reducer = (state, action) => {
    console.log("ACTION", action.listItem)
    console.log("UPDATE", action.type)
    console.log("STATE", state)

    switch (action.type) {

        case "UPDATE":
            return {
                ...state,
                list: [...state.list, action.exercise]
            };
        case "FILTER":
            return {
                ...state,
                list: state.list.filter((item) => item.ExerciseId !== action.ExerciseId)
            };

        case "CLEAR":
            return {
                ...state,
                list: []
            };


        default:
            return state;
    }
};


export default function ProgramsModal({ onClose, onOpen, isOpen, exerciseState, exerciseDispatch, AccountInfo, workoutDispatch, tab, equipment, muscle_groups }) {
    const [term, setTerm] = useState("")
    const [workout_name, setName] = useState("")
    const initialState = { list: [] }
    const [state, dispatch] = useReducer(reducer, initialState);
    const [focused, setFocused] = useState(false)




    const addToList = (exercise) => {
        console.log("EXERCISE", exercise)

        dispatch({ type: "UPDATE", exercise: exercise });


    }

    const deleteFromList = (id) => {

        dispatch({ type: "FILTER", ExerciseId: id });

    }



    const CreateWorkout = async () => {



        const res = await fetch('http://localhost:9000/createWorkout', {
            method: 'POST',
            'credentials': 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ TrainerId: AccountInfo.TrainerId, exercises: state.list, workout_name: workout_name }),
        })

        const { data, status } = await res.json()
        console.log("data", data.workout)

        workoutDispatch({ type: "UPDATE", workout: data.workout });
        onClose()

    }

    const Clear = () => {

        dispatch({ type: "RETURN" });
        onClose()
        setTerm("")

    }

    useEffect(() => {

        return () => {
            dispatch({ type: "CLEAR" });
        }
    }, [])


    return (
        <>

            <Modal
                isCentered
                onClose={Clear}
                isOpen={isOpen}
                motionPreset="slideInBottom"
            >
                <ModalOverlay />


                {tab === "Home" ? <ModalContent>
                    <ModalHeader>Create Program</ModalHeader>
                    <ModalCloseButton />
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
                                <List exerciseState={exerciseState} addToList={addToList} term={term} />

                            </div>}
                        </InputGroup>

                        <div className={styles.exercise_list}>
                            {state.list.map((listItem) => (
                                <div className={styles.exercise}>
                                    <span> {listItem.Name}</span>

                                    <span onClick={() => deleteFromList(listItem.ExerciseId)}><MdClose /></span>
                                </div>
                            ))}
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ marginRight: "6px" }} variant="ghost" onClick={() => Clear()}>Close</Button>
                        <Button colorScheme="red" mr={3} onClick={() => CreateWorkout()}>
                            Save
                        </Button>

                    </ModalFooter>
                </ModalContent> : <CreateExercise onClose={onClose} onOpen={onOpen} isOpen={isOpen} exerciseState={exerciseState} exerciseDispatch={exerciseDispatch} muscle_groups={muscle_groups} equipment={equipment} />}
            </Modal>
        </>
    )
}
