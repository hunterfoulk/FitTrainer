import React, { useReducer } from 'react'
import { SearchIcon } from "@chakra-ui/icons"
import { Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, InputGroup, Input, InputLeftElement } from "@chakra-ui/react"
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,

        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);
const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const workoutReducer = (state, action) => {
    console.log("FIRED", action)
    switch (action.type) {

        case "SET":
            return {
                ...state,
                workout: action.workout
            };
        case "FILTER":
            return {
                ...state,
                workout: {
                    ...state.workout,
                    exercises: state.workout.exercises.filter((exercises, i) => exercises.ExerciseId !== action.ExerciseId)
                },
            };
        case "ADD":
            return {
                ...state,
                workout: {
                    ...state.workout,
                    exercises: [...state.workout.exercises, action.Exercise]

                },

            }
        case "CHANGE_WORKOUT_NAME":
            return {
                ...state,
                workout: {
                    ...state.workout,
                    workout_name: action.workout_name
                }
            }

        default:
            return state;
    }
};


export default function TrainersWorkoutList({ workouts, workoutTerm }) {
    const initialState = { workouts: workouts, workout: {} };
    const [state, dispatch] = useReducer(workoutReducer, initialState);


    return (
        <>
            {state.workouts.filter(item => item.workout_name.toLowerCase().includes(workoutTerm.toLowerCase())).map((workout, i) => {
                // let FirstName = client.FirstName.charAt(0).toUpperCase() + client.FirstName.slice(1)
                // let LastName = client.LastName.charAt(0).toUpperCase() + client.LastName.slice(1)
                // let JoinDate = client.JoinDate.split('T')[0]
                // let maxGoals = 5
                // let clientCurr = client.thisWeeksWorkouts
                // let clientGoal = parseInt(client.Goal)

                // let currTotal = clientCurr / clientGoal
                // console.log("YO PERECENTAGE", clientCurr)

                // let goalPercentage = currTotal * 100
                // console.log("GOAL PERECENTAGE", goalPercentage)

                return (

                    <StyledTableRow className="cursor-pointer" onClick={() => {
                        // setClientDetails(client)
                        // setModalToggled(true)
                    }}


                    >

                        <StyledTableCell className="flex justify-center items-center w-[200px]" >
                            {workout.workout_name}
                        </StyledTableCell>
                        <StyledTableCell className="" align="center">

                            {workout.exercises.map((exercise) => (
                                <span className="mx-2 mb-3 border-b border-black">{exercise.Name}</span>
                            ))}

                        </StyledTableCell>
                        <StyledTableCell className="" align="center">
                            <IconButton aria-label="delete" size="small">
                                <EditIcon />
                            </IconButton>

                        </StyledTableCell>
                        <StyledTableCell className="" align="center">
                            <IconButton aria-label="delete" size="small" className="mr-1">
                                <DeleteIcon className="text-[#ee2b45]" />
                            </IconButton>

                        </StyledTableCell>

                    </StyledTableRow>
                )
            })}



        </>
    )
}
