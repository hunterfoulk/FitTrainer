import React, { useEffect, useState } from 'react'
import Card from "./card"
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";

const ThisWeek = ({ Appointments, isToggled, setToggled, dispatch }) => {
    const [state, setState] = useState([])

    let curr = new Date()
    let week = []

    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i
        let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
        week.push(day)
    }
    console.log("DATE ARRAY", week)

    useEffect(() => {
        let _appointments = Appointments.filter(appointment => week.includes(appointment.startDate.split('T')[0]))

        if (_appointments) {
            setState(_appointments)
        } else {
            setState(null)

        }
    }, [])

    function MyContents() {
        return (
            <h1 className="text-center w-full">
                Your currently have no appointments for this week.
            </h1>
        );
    }




    return (
        <>

            {state.length ?
                <AnimateSharedLayout type="crossfade">
                    {state.map((item, index: number) => (


                        <Card item={item} index={index} isToggled={isToggled} setToggled={setToggled} dispatch={dispatch} />

                    ))}
                </ AnimateSharedLayout>
                :
                <MyContents />}
        </>
    )
}

export default ThisWeek