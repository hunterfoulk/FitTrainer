
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
    Button
} from "@chakra-ui/react"
import React, { useRef, useState } from "react"
import { useDisclosure } from "@chakra-ui/react"
import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";


export default function ClientModal({ onClose, isOpen, onOpen }) {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef()
    const [value, onChange] = useState(new Date());

    const [selectedDate, handleDateChange] = useState(new Date("2019-01-01T18:54"));
    const [locale, setLocale] = useState("en");
    moment.locale("en");

    return (
        <>


            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Client Appointment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input ref={initialRef} placeholder="First name" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Input placeholder="Last name" />
                        </FormControl>
                        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
                            <DateTimePicker
                                value={selectedDate}
                                onChange={handleDateChange}
                                label="Start Date & Time"
                                showTodayButton
                                style={{ zIndex: "999" }}
                            />
                        </MuiPickersUtilsProvider>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Save
            </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}