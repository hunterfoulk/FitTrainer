
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
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputLeftElement,
    Button
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import React, { useRef, useState } from "react"
import styles from "../../../styles/dashboard/ProgramsTab.module.scss"



export default function ProgramsModal({ onClose, onOpen, isOpen }) {
    const [term, setTerm] = useState("")

    return (
        <>

            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Program</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >

                        <Input type="tel" placeholder="Name" style={{ marginBottom: "30px" }} />

                        <InputGroup style={{ marginBottom: "30px", position: "relative" }} >
                            <InputLeftElement
                                pointerEvents="none"
                                children={<SearchIcon color="gray.300" />}
                            />
                            <Input type="tel" placeholder="Exercises" value={term} onChange={(e) => setTerm(e.target.value)} />
                            {term !== "" && <div className={styles.list} style={{ position: "absolute", backgroundColor: "white", top: "50px", width: "100%", zIndex: "100", minHeight: "300px", maxHeight: "300px", overflowY: "auto", boxShadow: " 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)", border: "1px solid grey" }}>

                                {top100Films.map((item) => (
                                    <div className={styles.list_item} key={item.title}>
                                        <span>{item.title}</span>
                                    </div>
                                ))}
                            </div>}
                        </InputGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ marginRight: "6px" }} variant="ghost">Save</Button>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                       </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
const top100Films = [
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
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 }

]