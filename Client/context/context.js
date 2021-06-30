
import React, { createContext, useReducer } from 'react';
import { appointmentReducer } from './reducer';


export const AppointmentContext = createContext(undefined);




export const AppointmentContextProvider = ({ children }) => {
    const initialState = {
        appointment: {},
        workouts: []


    };
    const [appData, dispatch] = useReducer(appointmentReducer, initialState);

    return (
        <AppointmentContext.Provider value={{ appData, dispatch }}>
            {children}
        </AppointmentContext.Provider>
    );
};