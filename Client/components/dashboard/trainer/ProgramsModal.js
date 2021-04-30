
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


        case "RETURN":
            return {
                ...state,
                list: []
            }

        default:
            return state;
    }
};


export default function ProgramsModal({ onClose, onOpen, isOpen, exerciseList, AccountInfo }) {
    const [term, setTerm] = useState("")
    const [workout_name, setName] = useState("")
    const initialState = { list: exerciseList };
    const [state, dispatch] = useReducer(reducer, initialState);


    const addToList = (exercise) => {
        console.log("EXERCISE", exercise)

        dispatch({ type: "UPDATE", exercise: exercise });
        setTerm("")


    }

    const deleteFromList = (id) => {

        dispatch({ type: "FILTER", ExerciseId: id });


    }

    const Clear = () => {

        dispatch({ type: "RETURN" });
        onClose()
        setTerm("")

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
        console.log("data", data)



    }

    return (
        <>

            <Modal
                isCentered
                onClose={Clear}
                isOpen={isOpen}
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Program</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >

                        <Input type="tel" placeholder="Name" style={{ marginBottom: "30px" }} value={workout_name} onChange={(e) => setName(e.target.value)} />

                        <InputGroup style={{ marginBottom: "30px", position: "relative" }} className={styles.group}>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<SearchIcon color="gray.300" />}
                            />
                            <Input type="tel" placeholder="Exercises" value={term} onChange={(e) => setTerm(e.target.value)} />

                            {term !== "" && <div className={styles.list} style={{ position: "absolute", backgroundColor: "white", top: "50px", width: "100%", zIndex: "100", maxHeight: "300px", overflowY: "auto" }}>
                                <List exerciseList={exerciseList} addToList={addToList} term={term} />

                            </div>}
                        </InputGroup>

                        <div className={styles.exercise_list}>
                            {state.list.map((listItem) => (
                                <div className={styles.exercise}>
                                    <span> {listItem.Name}</span>
                                    <span onClick={() => deleteFromList(listItem.ExerciseId)}><MdClose /></span>
                                </div>
                            ))}</div>

                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ marginRight: "6px" }} variant="ghost" onClick={() => CreateWorkout()}>Save</Button>
                        <Button colorScheme="red" mr={3} onClick={() => Clear()}>
                            Close
                       </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
const top100Films = [
    { title: 'Barbell Bench Press', year: 1994, id: 1 },
    { title: 'The Godfather', year: 1972, id: 2 },
    { title: 'The Godfather: Part II', year: 1974, id: 3 },
    { title: 'The Dark Knight', year: 2008, id: 4 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 }

]