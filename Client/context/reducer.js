
export const appointmentReducer = (state, action) => {
    console.log("reducer action has fired!!!", action)

    switch (action.type) {
        case 'SET':
            return {
                ...state,
                appointment: action.appointment,
                workouts: action.workouts
            };
        case 'UPDATE':
            return {
                ...state,
                appointment: { ...state.appointment, WorkoutId: action.WorkoutId, workout: action.workout },
                appointments: state.appointments.map(appointment => action.id === appointment.id ? { ...appointment, WorkoutId: action.WorkoutId, workout: action.workout } : appointment)
            };
        case 'DELETE':
            return {
                ...state,
                appointment: { ...state.appointment, WorkoutId: null, workout: {} },
                appointments: state.appointments.map(appointment => action.id === appointment.id ? { ...appointment, WorkoutId: null, workout: {} } : appointment)
            };
        case 'UPDATE_COMPLETED_STATUS_TRUE':
            return {
                ...state,
                appointment: { ...state.appointment, completed: true },
                appointments: state.appointments.map(appointment => action.id === appointment.id ? { ...appointment, completed: true } : appointment)
            };
        case 'UPDATE_COMPLETED_STATUS_FALSE':
            return {
                ...state,
                appointment: { ...state.appointment, completed: false },
                appointments: state.appointments.map(appointment => action.id === appointment.id ? { ...appointment, completed: false } : appointment)
            };
        case "SET_APPOINTMENTS":
            return {
                ...state,
                appointments: action.appointments
            };
        case "UPDATE_APPOINTMENTS":
            return {
                ...state,
                appointments: [...state.appointments, action.appointment]
            };
        case "FILTER_APPOINTMENTS":
            return {
                ...state,
                appointments: state.appointments.filter((item) => item.id !== action.id),
            };
        case "CHANGED":
            return {
                ...state,
                appointments: state.appointments.map(appointment => (action.changed[appointment.id] ? { ...appointment, ...action.changed[appointment.id] } : appointment))
            };
        case "DELETE_WORKOUT":
            return {
                ...state,
                appointments: state.appointments.map(appointment => action.id == appointment.id ? { ...appointment, WorkoutId: null, workout: {} } : appointment)
            }
        case "UPDATE_WORKOUT":
            return {
                ...state,
                appointments: state.appointments.map(appointment => action.id == appointment.id ? { ...appointment, WorkoutId: action.WorkoutId, workout: action.workout } : appointment)
            }
        default:
            return state;
    }
};