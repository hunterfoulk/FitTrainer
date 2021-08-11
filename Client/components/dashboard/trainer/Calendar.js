import React, { useState, useEffect, useReducer, useContext } from "react"
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { makeStyles } from '@material-ui/core/styles';
import { TiDeleteOutline } from 'react-icons/ti';
import { AppointmentContext } from "../../../context/context"
import axios from "axios"
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
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
import { connectProps } from '@devexpress/dx-react-core';
import PriorityHigh from '@material-ui/icons/PriorityHigh';
import LowPriority from '@material-ui/icons/LowPriority';
import Lens from '@material-ui/icons/Lens';
import Event from '@material-ui/icons/Event';
import AccessTime from '@material-ui/icons/AccessTime';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import classNames from 'clsx';
import Moment from 'react-moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

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

const useTooltipContentStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    width: '400px',
  },
  contentContainer: {
    paddingBottom: theme.spacing(1.5),
  },
  text: {
    ...theme.typography.body2,
    display: 'inline-block',
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
  },
  icon: {
    verticalAlign: 'middle',
  },
  contentItemIcon: {
    textAlign: 'center',
  },
  grayIcon: {
    color: theme.palette.action.active,
  },
  colorfulContent: {
    color: ({ color }) => color[300],
  },
  lens: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    verticalAlign: 'super',
  },
  textCenter: {
    textAlign: 'center',
    display: "flex",
    justifyContent: "center"
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
}));


const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);




const Appointment = ({ appointmentData, children, style, ...restProps }) => {



  return (
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
}




const TooltipContent = ({ appointmentData, formatDate, appointmentResources }) => {
  const classes = useTooltipContentStyles({ color: "red" });
  const { dispatch: appointmentDispatch, appData } = useContext(AppointmentContext);

  const handleChange = async (event) => {
    // setState({ ...state, [event.target.name]: event.target.checked });

    console.log("STATUSSS", appData.appointment.completed)

    if (appData.appointment.completed == false) {
      console.log("false")
      appointmentDispatch({ type: "UPDATE_COMPLETED_STATUS_TRUE", id: appData.appointment.id })

      await fetch('http://localhost:9000/updateAppointmentCompletedStatus', {
        method: 'POST',
        'credentials': 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: appData.appointment.id, status: true }),
      })


    } else {
      console.log("not false")
      appointmentDispatch({ type: "UPDATE_COMPLETED_STATUS_FALSE", id: appData.appointment.id })

      await fetch('http://localhost:9000/updateAppointmentCompletedStatus', {
        method: 'POST',
        'credentials': 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: appData.appointment.id, status: false }),
      })


    }





  };

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

    appointmentDispatch({ type: "DELETE", id: appData.appointment.id })
    // dispatch({ type: "DELETE_WORKOUT", id: appData.appointment.id })

    await fetch('http://localhost:9000/deleteWorkoutFromAppointment', {
      method: 'POST',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: appData.appointment.id }),
    })



  }


  const handleWorkoutAdd = async (e) => {

    let workout = appData.workouts.find(workout => workout.WorkoutId == e.target.value)
    console.log("FOUND WORKOUT", workout)
    // appointmentDispatch({ type: "UPDATE", WorkoutId: e.target.value, workout: workout })
    appointmentDispatch({ type: "UPDATE", id: appData.appointment.id, WorkoutId: e.target.value, workout: workout })


    await fetch('http://localhost:9000/updateAppointmentWorkout', {
      method: 'POST',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ WorkoutId: e.target.value, id: appData.appointment.id }),
    })

  }





  return (
    <div className={classes.content}>
      <Grid container alignItems="flex-start" className={classes.titleContainer}>
        <Grid item xs={2} className={classNames(classes.textCenter)}>
          <img src={appointmentData.Avatar} className="rounded-full h-[40px] w-[40px]" />
        </Grid>
        <Grid item xs={10}>
          <div>
            <div className={classNames(classes.title, classes.dateAndTitle)}>
              {appointmentData.title}
            </div>
            <div className={classNames(classes.text, classes.dateAndTitle)}>
              <Moment format="dddd, MMMM Do YYYY">{appointmentData.startDate}</Moment>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.contentContainer}>
        <Grid item xs={2} className={classes.textCenter}>
          <AccessTime className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <div className={classes.text}>
            {`${formatDate(appointmentData.startDate, { hour: 'numeric', minute: 'numeric' })}
              - ${formatDate(appointmentData.endDate, { hour: 'numeric', minute: 'numeric' })}`}
          </div>
        </Grid>
      </Grid>


      {/* <div className="flex w-full mt-2 ">
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
                  <span className="underline cursor-pointer text-[16px] relative bottom-[2px]">{appData.appointment.workout.workout_name}</span>
                </Tooltip>
                < TiDeleteOutline className="ml-5 cursor-pointer text-lg relative bottom-[2px]" onClick={() => {
                  handleWorkoutDelete()

                }} />
              </div>
            </>
          }

        </div>

      </div> */}
      {/* <div className="flex w-full mt-2 px-6">
        <FormControlLabel
          control={<GreenCheckbox checked={appData.appointment.completed} onChange={handleChange} name="checkedG" />}
          label={appData.appointment.completed ? "Completed" : "Not Completed"}
        />
      </div> */}
    </div>
  );
};




export default function Demo({ Workouts }) {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10))
  const [workout, setWorkout] = useState({})
  const currentDateChange = (currentDate) => { setCurrentDate({ currentDate }); };
  const defaultCurrentDate = new Date().toISOString().slice(0, 10)
  const { dispatch: appointmentDispatch, appData } = useContext(AppointmentContext);


  console.log("REFIRED!@$!#$")



  const commitChanges = async ({ added, changed, deleted }) => {
    console.log("deleted", deleted)
    if (deleted) {
      appointmentDispatch({ type: "FILTER_APPOINTMENTS", id: deleted })


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


  return (
    <>
      <Scheduler
        data={appData.appointments}
        height="auto"
      >

        <ViewState

          defaultCurrentDate={defaultCurrentDate}
        />

        <WeekView
          startDayHour={7.5}
          endDayHour={20}
        />
        <DayView
          startDayHour={7.5}
          endDayHour={20} />

        <Toolbar />

        <ViewSwitcher />

        <DateNavigator />

        <TodayButton />

        <Appointments appointmentComponent={Appointment} />
        <EditingState
          onCommitChanges={commitChanges}

        />
        <EditRecurrenceMenu />

        <AppointmentTooltip
          contentComponent={TooltipContent}
          showCloseButton
          showDeleteButton

        />



      </Scheduler>

    </>
  );
}

