import React, { useState, useEffect } from 'react'
import Card from "./card"
import Test from "./test"
import Moment from 'react-moment';

const Today = ({ Appointments, isToggled, setToggled, dispatch, handleChange }) => {
    const [state, setState] = useState([])
    let today = new Date()

    let formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }


    useEffect(() => {
        let _appointments = Appointments.filter(appointment => appointment.startDate.split('T')[0] == formatDate(today))

        if (_appointments) {
            setState(_appointments)
        } else {
            setState(null)

        }
    }, [])

    function MyContents() {
        return (
            <h1 className="text-center w-full">
                Your currently have no appointments for today.
            </h1>
        );
    }


    return (
        <>
            {state.length ? state.map((item, index: number) => (



                <Card item={item} index={index} isToggled={isToggled} setToggled={setToggled} dispatch={dispatch} handleChange={handleChange} />

            )) : <MyContents />}
        </>
    )

    {/* {Appointments.filter(appointment => appointment.startDate.split('T')[0] == formatDate(today)).map((item, index: number) => (
                <>


                    <Card item={item} index={index} isToggled={isToggled} setToggled={setToggled} />
                </>
            ))} */}




}

export default Today
{/* {returnComponenet()} */ }
