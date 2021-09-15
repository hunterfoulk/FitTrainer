
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
import React, { useRef, useState, useContext, forwardRef } from "react"
import { useDisclosure } from "@chakra-ui/react"
import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import {
    Select
} from "@chakra-ui/react"

import DatePicker from "react-datepicker";
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import Moment from 'react-moment';
import { FaRegCalendar } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";


export default function ClientModal({ onClose, isOpen, onOpen, TrainersClients, AccountInfo, dispatch }) {
    moment.locale("en");
    const [selectedDateStart, handleDateChangeStart] = useState(new Date())
    const [selectedDateEnd, handleDateChangeEnd] = useState(new Date())
    const [title, setTitle] = useState(0)

    console.log("TITLE", title)

    const CreateAppointment = async (e) => {
        e.preventDefault()
        if (title === undefined) {
            console.log("NO TITLE VALUE")
            return;
        } else {
            let payload = {
                ClientId: title,
                TrainerId: AccountInfo.TrainerId,
                startDate: selectedDateStart,
                endDate: selectedDateEnd,
            }

            const res = await fetch('https://apextraining.herokuapp.com/createAppointment', {
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

            console.log("DATA", data)

            onClose()
            dispatch({ type: "UPDATE_APPOINTMENTS", appointment: data });

        }
    }

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="border-2 w-full border-gray mt-2 rounded-sm shadow-sm  px-1 py-1 text-md" onClick={onClick}
            ref={ref}>
            <Moment format="LLLL">{value}</Moment>

        </button>
    ));

    return (
        <>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="text-center">Create Appointment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <>
                            <Select className="selecter" placeholder="Clients" onChange={(e) => setTitle(e.target.value)} value={title}>
                                {TrainersClients.map((client) => (

                                    <option style={{ padding: "20px" }} value={client.ClientId}>{client.FirstName} {client.LastName}</option>
                                ))}

                            </Select>

                            <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "100%", flexDirection: "column", height: "150px", marginTop: "30px", alignItems: "center" }}>
                                <div className="w-full flex flex-col">
                                    <div className="flex flex-row w-full items-center justify-center font-semibold">
                                        <FaRegCalendar className="relative bottom-[1px]" />
                                        <span className="ml-2">Start Date & Time</span>

                                    </div>
                                    <DatePicker showTimeSelect
                                        dateFormat="yyyy/MM/dd hh:mm a"

                                        minTime={setHours(setMinutes(new Date(), 0), 8)}
                                        maxTime={setHours(setMinutes(new Date(), 30), 19)}

                                        selected={selectedDateStart} onChange={(date) => {
                                            handleDateChangeStart(date)
                                        }} customInput={<ExampleCustomInput />} />

                                </div>

                                <div className="w-full flex flex-col">
                                    <div className="flex flex-row w-full items-center justify-center font-semibold">
                                        <FaRegCalendar className="relative bottom-[1px]" />
                                        <span className="ml-2">Start Date & Time</span>

                                    </div>
                                    <DatePicker showTimeSelect
                                        dateFormat="yyyy/MM/dd hh:mm a"

                                        minTime={setHours(setMinutes(new Date(), 0), 8)}
                                        maxTime={setHours(setMinutes(new Date(), 30), 19)}

                                        selected={selectedDateEnd} onChange={(date) => {
                                            handleDateChangeEnd(date)
                                        }} customInput={<ExampleCustomInput />} />

                                </div>
                                {/* <div style={{ width: "100%" }}>

                                    <label>Start Date & Time</label>
                                    <input type="datetime-local" id="birthdaytime" name="birthdaytime" style={{ width: "100%" }} value={selectedDateEnd}
                                        onChange={(e) => handleDateChangeEnd(e.target.value)} />
                                </div> */}

                            </div>

                        </>
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button onClick={onClose} style={{ marginLeft: "10px" }}>Close</Button> */}
                        <span onClick={onClose} className="text-gray-400 cursor-pointer hover:underline py-1 mx-3" >Close</span>
                        <span className="text-[#649CEA] font-medium cursor-pointer hover:underline py-1 mx-3" onClick={(e) => CreateAppointment(e)}>Save</span>

                        {/* <Button onClick={onClose} style={{ backgroundColor: "rgb(238, 43, 69)", color: "white" }} onClick={(e) => CreateAppointment(e)}>Save</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}