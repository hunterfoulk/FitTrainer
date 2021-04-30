import React, { useState, useEffect } from "react"
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { FaPaperclip } from 'react-icons/fa';
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
  AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui';
import { red } from '@material-ui/core/colors';
import { Select } from "@chakra-ui/react"




const Disabled = ({
  children, appointmentData, style, ...restProps
}) => (
  <AppointmentForm.CommandLayout
    {...restProps}
    appointmentData={appointmentData}
    disableSaveButton={false}
  >

    {children}

  </AppointmentForm.CommandLayout>
);

const LayoutContent = ({
  children, appointmentData, style, ...restProps
}) => (
  <AppointmentForm.TextEditor
    {...restProps}
    style={{
      ...style,
      backgroundColor: '#ee2b45',
      display: 'none',
    }}
  >
    {children}
    <span>Hello</span>
  </AppointmentForm.TextEditor>
);

const SelectContent = ({
  children, appointmentData, style, ...restProps
}) => (
  <AppointmentForm.BooleanEditor
    {...restProps}
    style={{
      ...style,
      backgroundColor: '#ee2b45',
      display: 'none',
    }}
  >
    {children}
    <span></span>
  </AppointmentForm.BooleanEditor>


);

const ResourceEditor = ({
  children, appointmentData, style, ...restProps
}) => (
  <AppointmentForm.ResourceEditor
    {...restProps}
    style={{
      ...style,
      backgroundColor: '#ee2b45',
      display: 'none',
    }}
  >
    {children}
    <span>yo</span>
  </AppointmentForm.ResourceEditor>


);


export default function Demo({ dispatch, state }) {
  const [currentDate, setCurrentDate] = useState("2021-04-23")
  const [workout, setWorkout] = useState("")
  const currentDateChange = (currentDate) => { setCurrentDate({ currentDate }); };

  // useEffect(() => {
  //   console.log("refired")
  // }, [state])


  async function commitChanges({ added, changed, deleted }) {


    if (changed) {
      let newChanged = Object.keys(changed)
      let obj = newChanged[0]
      let id = obj
      let arr = state.appointments.find(x => x.id == id)

      if (workout !== "") {
        console.log("WORKOUT NOT EMPTY", workout)
        console.log("CHANGED", changed)


        let newObj = { [id]: { workout: workout } }
        dispatch({ type: "CHANGED", changed: newObj });

        //get workout by id from mapped workout array in select menu.
        //need to update database with new workout.

        console.log("ARRAY", arr)

        let payload = {
          id: id,
          startDate: changed[id].startDate || arr.startDate,
          endDate: changed[id].endDate || arr.endDate,
          workout: workout
        }
        // fetch/post request to update appointment in DB.

      }


      let payload = {
        id: id,
        startDate: changed[id].startDate || arr.startDate,
        endDate: changed[id].endDate || arr.endDate,
        workout: workout || null
      }

      // fetch/post request to update appointment in DB.
      dispatch({ type: "CHANGED", changed: changed });



    } else if (deleted) {
      dispatch({ type: "FILTER_APPOINTMENTS", id: deleted });

      await fetch('http://localhost:9000/deleteAppointment', {
        method: 'POST',
        'credentials': 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: deleted }),
      })
    }



  }
  const Content = ({
    children, appointmentData, style, ...restProps
  }) => (
    <AppointmentTooltip.Content
      {...restProps} appointmentData={appointmentData}

    >

      {children}

    </AppointmentTooltip.Content>
  );


  const LayoutComponent = ({
    children, appointmentData, style, ...restProps

  }) => (
    <AppointmentForm.BasicLayout
      {...restProps} appointmentData={appointmentData}

    >

      {children}
      <div style={{ marginBottom: "5px", marginTop: "25px" }}>
        <h1 style={{ fontSize: "18px", color: "black", fontWeight: "bold" }}>Attach Workout</h1>
      </div>
      <div >
        <Select placeholder="Select Program" onChange={(e) => setWorkout(e.target.value)} value={workout}>
          <option value="Upper Chest Day">Upper Chest Day</option>
          <option value="option2">Back Day</option>
        </Select>

      </div>

    </AppointmentForm.BasicLayout>

  );
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


  console.log("workouttt", workout)
  return (
    <Paper style={{ height: "100%", minWidth: "100%", maxHeight: "100%" }}>
      <Scheduler
        data={state.appointments}
        height="auto"
      >

        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
        />

        <WeekView
          startDayHour={6}
          endDayHour={20}
        />
        <DayView
          startDayHour={6}
          endDayHour={20} />
        <EditingState
          onCommitChanges={commitChanges}
        />

        <EditRecurrenceMenu radioGroupComponent={LayoutContent} />
        <IntegratedEditing />
        <ConfirmationDialog style={{ position: "absolute", top: "5px" }} />
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton />
        <Appointments appointmentComponent={Appointment} />


        <AppointmentTooltip
          contentComponent={Content}
          showCloseButton
          showDeleteButton
          showOpenButton
        />
        {/* layoutComponent={LayoutComponent} */}
        <AppointmentForm commandLayoutComponent={Disabled} textEditorComponent={LayoutContent} booleanEditorComponent={SelectContent} resourceEditorComponent={ResourceEditor} basicLayoutComponent={LayoutComponent} />
      </Scheduler>
    </Paper>
  );
}

