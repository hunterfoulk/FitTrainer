import React, { useState, useEffect } from 'react'
import Card from "./card"
import Moment from 'react-moment';

const Completed = ({ Appointments, isToggled, setToggled, dispatch }) => {
    const [state, setState] = useState([])

    let today = new Date("2021-07-21T14:00")
    console.log("TODAY", today)


    useEffect(() => {
        let _appointments = Appointments.filter(appointment => appointment.completed == 1)

        if (_appointments) {
            setState(_appointments)
        } else {
            setState(null)

        }
    }, [])

    function MyContents() {
        return (
            <h1 className="text-center w-full">
                Your currently have no appointments that are completed.
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

export default Completed