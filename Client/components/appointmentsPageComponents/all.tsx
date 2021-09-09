import React, { useState, useEffect } from 'react'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import Card from "./card"

const All = ({ Appointments, isToggled, setToggled, dispatch, handleChange, Workouts }) => {
    // const [state, setState] = useState([])

    // useEffect(() => {
    //     let _appointments = Appointments

    //     if (_appointments) {
    //         setState(_appointments)
    //     } else {
    //         setState(null)

    //     }
    // }, [])

    function MyContents() {
        return (
            <h1 className="text-center w-full">
                Your currently have no appointments.
            </h1>
        );
    }
    useEffect(() => {
        console.log("STATE CHANGED!!!!")
    }, [Appointments])


    return (
        <>

            {Appointments.length ? Appointments.map((item, index: number) => (
                <>

                    <Card Workouts={Workouts} item={item} index={index} isToggled={isToggled} setToggled={setToggled} dispatch={dispatch} handleChange={handleChange} />
                </>
            )) : <MyContents />}
        </>
    )
}

export default All