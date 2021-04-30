import React, { useState, useCallback, useEffect } from 'react';
import { Button, IconButton, InputAdornment } from "@material-ui/core";
import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import styles from "../../../styles/dashboard/CreateAppointment.module.scss"
import TextField from '@material-ui/core/TextField';
import {
    Select
} from "@chakra-ui/react"

interface Props {
    TrainersClients: []
    AccountInfo: any
}


interface Appointment {
    AppointmentId?: number
    title?: string
    startDate: string
    endDate: string
    ClientId: number
    TrainerId: number

}

const CreateClientAppointment: React.FC<Props> = ({ TrainersClients, AccountInfo }) => {
    const [clearedDate, handleClearedDateChange] = useState(null);
    const [selectedDateStart, handleDateChangeStart] = useState<any>(new Date());
    const [selectedDateEnd, handleDateChangeEnd] = useState<any>(new Date());
    const [locale, setLocale] = useState("en");
    const [title, setTitle] = useState(0)

    moment.locale(locale);


    const CreateAppointment = async (e) => {
        e.preventDefault()
        if (title === undefined) {
            console.log("NO TITLE VALUE")
        }
        let payload: Appointment = {
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

        console.log(res)

    }

    useEffect(() => {
        console.log("TITLE", title)
    }, [title])

    return (
        <>
            <div className={styles.appointment_main}>
                <div className={styles.form_container}>

                    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
                        <>
                            <form >
                                <div className={styles.title}><h1>Create Session</h1></div>
                                <Select placeholder="Clients" onChange={(e: any) => setTitle(e.target.value)}>
                                    {TrainersClients.map((client: any) => (

                                        <option style={{ padding: "20px" }} value={client.ClientId}>{client.FirstName} {client.LastName}</option>
                                    ))}

                                </Select>

                                <KeyboardDateTimePicker
                                    value={selectedDateStart}
                                    onChange={handleDateChangeStart}
                                    label="Start Date & Time"
                                    onError={console.log}
                                    format="yyyy/MM/dd hh:mm a"
                                />
                                <KeyboardDateTimePicker
                                    value={selectedDateEnd}
                                    onChange={handleDateChangeEnd}
                                    label="End Date & Time"
                                    onError={console.log}
                                    format="yyyy/MM/dd hh:mm a"
                                />
                                <div className={styles.btn_container}>
                                    <button className={styles.btn} onClick={(e: any) => CreateAppointment(e)}>Save</button>
                                </div>

                            </form>
                        </>
                    </MuiPickersUtilsProvider>
                </div>
            </div>
        </>
    )
}

export default CreateClientAppointment