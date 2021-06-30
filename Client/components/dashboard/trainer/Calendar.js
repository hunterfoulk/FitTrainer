import React, { useState, useEffect, useReducer, useContext } from "react"
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import { TiDeleteOutline } from 'react-icons/ti';
import { AppointmentContext } from "../../../context/context"
import axios from "axios"
import {
  Scheduler,
  WeekView,
  DayView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentTooltip,
  ConfirmationDialog,
  ViewSwitcher,
  Resources,
  EditRecurrenceMenu,
  AppointmentForm,
  MonthView
} from '@devexpress/dx-react-scheduler-material-ui';
import { FaThumbtack } from 'react-icons/fa';
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy';






const reducer = (state, action) => {
  console.log("REDUCER JUST FIRED", action)
  switch (action.type) {

    case "SET":
      return {
        ...state,
        appointment: action.appointment
      };
    default:
      return state;
  }
};


const fetchWorkouts = async (TrainerId) => {

  const res = await axios.get('http://localhost:9000/getWorkouts', { params: { TrainerId: TrainerId } });
  const workouts = res.data.data.workouts
  return workouts
}


const Content = ({ children, appointmentData, style, ...restProps }) => {
  const { dispatch: appointmentDispatch, appData } = useContext(AppointmentContext);




  useEffect(async () => {

    if (appointmentData) {
      console.log("content component fired")
      let TrainerId = appointmentData.TrainerId
      let workouts = await fetchWorkouts(TrainerId)
      console.log("WORKOUTS", workouts)

      appointmentDispatch({ type: "SET", appointment: appointmentData, workouts: workouts })
    }
  }, [])





  const handleWorkoutDelete = async () => {
    console.log("DELETE")

    appointmentDispatch({ type: "DELETE" })


    await fetch('http://localhost:9000/deleteWorkoutFromAppointment', {
      method: 'POST',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: appointmentData.id }),
    })



  }


  const handleWorkoutAdd = async (e) => {


    let workout = appData.workouts.find(workout => workout.WorkoutId == e.target.value)
    console.log("FOUND WORKOUT", workout)
    appointmentDispatch({ type: "UPDATE", WorkoutId: e.target.value, workout: workout })

    await fetch('http://localhost:9000/updateAppointmentWorkout', {
      method: 'POST',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ WorkoutId: e.target.value, id: appointmentData.id }),
    })

  }




  return (
    <>

      <AppointmentTooltip.Content
        {...restProps} appointmentData={appointmentData}

      >
        {children}

        <div className="flex w-full mt-2 ">
          <div className="flex justify-center items-center w-[15%] pl-2">

            <FaThumbtack className="text-[20px] text-[#e0021b]" />
          </div>

          <div className="w-[85%] flex flex-row">
            {appData.appointment.WorkoutId == null ?
              <select id="moving-from" name="fromPlaceId" required="required" onChange={(e) => handleWorkoutAdd(e)}>
                <option selected="selected" disabled value="none">Select Workout</option>

                {appData.workouts?.map((element) => (
                  <>
                    <option value={element.WorkoutId}>{element.workout_name}</option>

                  </>
                ))}

              </select> :
              <>
                <div className="flex flex-row items-center ">
                  <Tooltip
                    position="bottom"
                    html={(
                      <div className="flex flex-col">

                        {appData.appointment.workout?.exercises.map((exercise) => (

                          <span>{exercise.Name}</span>
                        ))}

                      </div>
                    )}
                  >
                    <span className="underline cursor-pointer">{appData.appointment.workout.workout_name}</span>
                  </Tooltip>
                  < TiDeleteOutline className="ml-5 cursor-pointer text-lg" onClick={() => {
                    handleWorkoutDelete()

                  }} />
                </div>
              </>
            }

          </div>

        </div>


      </AppointmentTooltip.Content>
    </>
  )
};






export default function Demo({ dispatch, state, Workouts }) {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10))
  const [workout, setWorkout] = useState({})
  const currentDateChange = (currentDate) => { setCurrentDate({ currentDate }); };



  const Appointment = ({
    children, style, ...restProps
  }) => (
    <Appointments.Appointment

      {...restProps}
      style={{
        ...style,
        backgroundColor: '#ee2b45',
        borderRadius: '8px',
      }}
    >
      {children}

    </Appointments.Appointment>
  );

  const defaultCurrentDate = new Date().toISOString().slice(0, 10)



  return (

    <Scheduler
      data={state.appointments}
      height="auto"
    >

      <ViewState

        defaultCurrentDate={defaultCurrentDate}
      />

      <WeekView
        startDayHour={6}
        endDayHour={20}
      />
      <DayView
        startDayHour={6}
        endDayHour={20} />

      <Toolbar />

      <ViewSwitcher />

      <DateNavigator />

      <TodayButton />

      <Appointments appointmentComponent={Appointment} />


      <AppointmentTooltip
        contentComponent={Content}
        showCloseButton
        showDeleteButton

      />



    </Scheduler>

  );
}

