import React, { useState, useEffect, useReducer, useContext } from "react"
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { makeStyles } from '@material-ui/core/styles';
import { TiDeleteOutline } from 'react-icons/ti';
import axios from "axios"
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
import AccessTime from '@material-ui/icons/AccessTime';
import Grid from '@material-ui/core/Grid';
import classNames from 'clsx';
import Moment from 'react-moment';
import { grey } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';

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

const PurpleSwitch = withStyles({

  switchBase: {

    color: grey[300],
    '&$checked': {
      color: green[500],

    },
    '&$checked + $track': {
      backgroundColor: green[300],

    },
  },
  checked: {},
  track: {},
})(Switch);

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







const TooltipContent = ({ appointmentData, formatDate, appointmentResources }) => {
  const classes = useTooltipContentStyles({ color: "red" });
  const { dispatch: appointmentDispatch, appData } = useContext(AppointmentContext);
  // console.log("REST PROPS:", restProps)
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






  const handleChanged = async (event, item) => {
    console.log("ON CHANGE FIRED!", event.target.checked)
    appointmentDispatch({ type: "UPDATE_APPOINTMENT_STATUS", AppointmentId: item.id, completed: event.target.checked });
    item.completed = event.target.checked

    await fetch('http://localhost:9000/updateAppointmentCompletedStatus', {
      method: 'POST',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: item.id, status: event.target.checked }),
    })

  };


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
        <div className="w-full flex px-5 mt-2">
          <FormControlLabel
            classes={{ root: classes.input }}
            control={<PurpleSwitch checked={appointmentData.completed} onChange={(event) => handleChanged(event, appointmentData)} />}
            label=""
          />
        </div>

      </Grid>


    </div>
  );
};




export default function Demo({ Workouts, state, dispatch, setDrawerState, drawerState, handleClick }) {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10))
  const currentDateChange = (currentDate) => { setCurrentDate({ currentDate }); };
  const defaultCurrentDate = new Date().toISOString().slice(0, 10)
  // const { dispatch: appointmentDispatch, appData } = useContext(AppointmentContext);
  console.log("state yo", state)

  const handleDispatch = (e) => {
    dispatch({ type: "SET_DRAWER_STATE", drawerState: e.data })
  }

  console.log("REFIRED!@$!#$")
  const Appointment = ({ appointmentData, children, style, ...restProps }) => {



    return (
      <Appointments.Appointment

        {...restProps}
        style={{
          ...style,
          backgroundColor: '#ee2b45',
          borderRadius: '8px',
        }}
        onClick={(e) => handleClick(e.data)}
      >
        {children}

      </Appointments.Appointment>
    );
  }




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
        data={state.Appointments}
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

        <Appointments appointmentComponent={Appointment} state={state} dispatch={dispatch} />
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

