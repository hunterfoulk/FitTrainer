import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
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
} from '@devexpress/dx-react-scheduler-material-ui';
import { red } from '@material-ui/core/colors';

// let appointments = [
//   {
//     title: 'Website Re-Design Plan',
//     startDate: new Date(2018, 5, 25, 9, 35),
//     endDate: new Date(2018, 5, 25, 11, 30),
//     id: 0,
//     location: 'Room 1',
//   }, {
//     title: 'Book Flights to San Fran for Sales Trip',
//     startDate: new Date(2018, 5, 25, 12, 11),
//     endDate: new Date(2018, 5, 25, 13, 0),
//     id: 1,
//     location: 'Room 1',
//   }, {
//     title: 'Install New Router in Dev Room',
//     startDate: new Date(2018, 5, 25, 14, 30),
//     endDate: new Date(2018, 5, 25, 15, 35),
//     id: 2,
//     location: 'Room 2',
//   }
// ]
const resources = [{

  instances: [
    { color: red },
  ],
}];


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

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log("PROPS", props.appointments)
    this.state = {
      data: props.state.appointments,
      currentDate: '2021-04-23',
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };


  }



  async commitChanges({ added, changed, deleted }) {
    console.log("DELETED", deleted, changed, added)
    console.log("PROPS:", this.props.state.appointments)

    console.log("NEW DATA:", this.props.state.appointments)

    this.props.dispatch({ type: "FILTER_APPOINTMENTS", id: deleted });

    const res = await fetch('http://localhost:9000/deleteAppointment', {
      method: 'POST',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: deleted }),
    })


  }


  render() {
    const { data, currentDate } = this.state;

    return (
      <Paper style={{ height: "100%" }}>
        <Scheduler
          data={this.props.state.appointments}
          height="auto"
        >

          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
          />

          <WeekView
            startDayHour={6}
            endDayHour={21.5}
          />
          <DayView
            startDayHour={6}
            endDayHour={21.5} />
          <EditingState
            onCommitChanges={this.commitChanges}
          />

          <IntegratedEditing />
          <ConfirmationDialog style={{ position: "absolute", top: "5px" }} />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />
          <Appointments appointmentComponent={Appointment} />
          <Resources
            data={resources}
          />
          <AppointmentTooltip

            showCloseButton
            showDeleteButton
          />
        </Scheduler>
      </Paper>
    );
  }
}
