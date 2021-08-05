import React from 'react'
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


const ExerciseList = ({ exerciseState, exerciseDispatch, exerciseTerm, muscle_groups, equipment }) => {



    const style = {
        normal: {
            background: 'white',
            color: '#ffffff',
            cursor: "pointer"
        },
        hover: {
        }
    }


    return (
        <>
            {exerciseState.exercises.filter(exercise => exercise.Name.toLowerCase().includes(exerciseTerm.toLowerCase())).map((newExercise, i) => {

                return (

                    <StyledTableRow

                    >
                        <StyledTableCell className="flex flex-row ">  {newExercise.muscle_group_name} </StyledTableCell>

                        <StyledTableCell className="" align="center">{newExercise.Name}</StyledTableCell>
                        <StyledTableCell className="" align="right">{newExercise.equipment_name}</StyledTableCell>


                    </StyledTableRow>

                )
            })}



        </>
    )
}

export default ExerciseList