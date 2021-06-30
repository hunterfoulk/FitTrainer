
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
                appointment: { ...state.appointment, WorkoutId: action.WorkoutId, workout: action.workout }
            };
        case 'DELETE':
            return {
                ...state,
                appointment: { ...state.appointment, WorkoutId: null, workout: {} }
            };
        default:
            return state;
    }
};