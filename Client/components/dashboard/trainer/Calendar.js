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
  ViewSwitcher
} from '@devexpress/dx-react-scheduler-material-ui';


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

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log("PROPS", props.Appointments)
    this.state = {
      data: props.Appointments,
      currentDate: '2018-06-27',
    };
  
    this.commitChanges = this.commitChanges.bind(this);
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };


  }
 


  commitChanges({ added, changed, deleted }) {
    console.log("DELETED", deleted, changed, added)

    const newData = this.state.data.filter(appointment => appointment.id !== deleted);

    this.setState({ data: newData });
  }


  render() {
    const { data, currentDate } = this.state;

    return (
      <Paper style={{ height: "100%" }}>
        <Scheduler
          data={data}
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
          <Appointments />
          <AppointmentTooltip
           
            showCloseButton
            showDeleteButton
          />
        </Scheduler>
      </Paper>
    );
  }
}
