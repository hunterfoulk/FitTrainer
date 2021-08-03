import React, { useState, useEffect } from 'react'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import Card from "./card"

const All = ({ Appointments, isToggled, setToggled, dispatch }) => {
    const [state, setState] = useState([])

    useEffect(() => {
        let _appointments = Appointments

        if (_appointments) {
            setState(_appointments)
        } else {
            setState(null)

        }
    }, [])

    function MyContents() {
        return (
            <h1 className="text-center w-full">
                Your currently have no appointments.
            </h1>
        );
    }

    return (
        <>

            {state.length ? state.map((item, index: number) => (
                <>

                    <Card item={item} index={index} isToggled={isToggled} setToggled={setToggled} dispatch={dispatch} />
                </>
            )) : <MyContents />}
        </>
    )
}

export default All