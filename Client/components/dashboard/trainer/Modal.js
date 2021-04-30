
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
import {
    Select
} from "@chakra-ui/react"

export default function ClientModal({ onClose, isOpen, onOpen, TrainersClients, AccountInfo, dispatch, state }) {
    moment.locale("en");
    const [selectedDateStart, handleDateChangeStart] = useState(new Date())
    const [selectedDateEnd, handleDateChangeEnd] = useState(new Date("yyyy-MM-ddThh:mm"));
    const [locale, setLocale] = useState("en");
    const [title, setTitle] = useState(0)



    const CreateAppointment = async (e) => {
        e.preventDefault()
        // if (title === undefined) {
        //     console.log("NO TITLE VALUE")
        //     return;
        // }
        let payload = {
            ClientId: title,
            TrainerId: AccountInfo.TrainerId,
            startDate: selectedDateStart,
            endDate: selectedDateEnd,
        }

        const res = await fetch('http://localhost:9000/createAppointment', {
            method: 'POST',
            'credentials': 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payload: payload }),
        })
        console.log("PAYLOAD", payload)
        console.log(res)
        const { data, status } = await res.json()

        // data = {
        //     TrainerId: 1,
        //     id: 14,
        //     ClientId: 10,
        //     title: 'Hunter Foulk',
        //     startDate: '2021-04-24T08:00',
        //     endDate: '2021-04-24T09:00'
        // }

        console.log("DATA", data)

        onClose()
        dispatch({ type: "UPDATE", appointment: data });

    }


    return (
        <>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Appointment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <>
                            <Select placeholder="Clients" onChange={(e) => setTitle(e.target.value)}>
                                {TrainersClients.map((client) => (

                                    <option style={{ padding: "20px" }} value={client.ClientId}>{client.FirstName} {client.LastName}</option>
                                ))}

                            </Select>

                            <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "100%", flexDirection: "column", height: "150px", marginTop: "30px", alignItems: "center" }}>
                                <div style={{ width: "100%" }}>
                                    <label>Start Date & Time</label>
                                    <input type="datetime-local" id="birthdaytime" name="birthdaytime" style={{ width: "100%" }} value={selectedDateStart}
                                        onChange={(e) => handleDateChangeStart(e.target.value)} />
                                </div>
                                <div style={{ width: "100%" }}>
                                    <label>Start Date & Time</label>
                                    <input type="datetime-local" id="birthdaytime" name="birthdaytime" style={{ width: "100%" }} value={selectedDateEnd}
                                        onChange={(e) => handleDateChangeEnd(e.target.value)} />
                                </div>

                            </div>

                        </>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} style={{ backgroundColor: "rgb(238, 43, 69)", color: "white" }} onClick={(e) => CreateAppointment(e)}>Save</Button>
                        <Button onClick={onClose} style={{ marginLeft: "10px" }}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}