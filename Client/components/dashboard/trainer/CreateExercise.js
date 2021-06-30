
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


export default function CreateExercise({exerciseState,exerciseDispatch,muscle_groups,equipment,onClose}) {
    const [name, setName] = useState("")
    const [EquipmentId,setEquipmentId]=useState()
    const [MuscleGroupId,setMuscleGroupId]=useState()

const Clear = () =>{
    onClose()
    setName("")

}

    const CreateExercise = async () => {

        const res = await fetch('http://localhost:9000/createNewExercise', {
            method: 'POST',
            'credentials': 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Name: name, EquipmentId: EquipmentId, MuscleGroupId: MuscleGroupId }),
        })
        const { data, status } = await res.json()
  
        exerciseDispatch({ type: "UPDATE", newExercise: data.newExercise });

        onClose()

    }


    return (
    <ModalContent>
                    <ModalHeader>Create Exercise</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >

                        <Input type="tel" placeholder="Name" style={{ marginBottom: "30px" }} value={name} onChange={(e) => setName(e.target.value)} />

                  <div className="relative inline-flex w-full">
  <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
  <select className="border border-gray-300 rounded-md w-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"  onChange={(e) => setMuscleGroupId(e.target.value)}>
     <option selected="selected" disabled value="none">Select Muscle Group</option>
{muscle_groups.map((muscle_group)=>(
         <option value={muscle_group.MuscleGroupId}>{muscle_group.muscle_group_name}</option>
))}
  </select>


</div>

<div className="relative inline-flex w-full mt-8">
 <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
    <select className="border border-gray-300 rounded-md w-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none" onChange={(e) => setEquipmentId(e.target.value)}>
     <option selected="selected" disabled value="none">Select Equipment</option>
{equipment.map((equipment)=>(
         <option value={equipment.EquipmentId}>{equipment.equipment_name}</option>
))}
  </select>
  </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ marginRight: "6px" }} variant="ghost" onClick={()=> Clear()}>Close</Button>
                        <Button colorScheme="red" mr={3} onClick={()=> CreateExercise()}>
                            Save
                       </Button>

                    </ModalFooter>
                </ModalContent>
    )
}
