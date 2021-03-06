import React, { useState } from 'react'
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
import ExerciseList from "../trainer/exerciseList"

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



const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});



const ExerciseTab = ({ exerciseState, exerciseDispatch, exerciseTerm, muscle_groups, equipment }) => {
    const classes = useStyles();



    return (
        <>
            <motion.div className="flex flex-col w-full max-w-[1400px] items-center px-4 mt-4" >

                <motion.div className="w-full max-w-[1400px] h-[100vh]" initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} transition={{ duration: 0.3 }}>
                    <TableContainer component={Paper} className="w-full max-w-[1400px] mt-5 ">
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead >
                                <TableRow>
                                    <StyledTableCell >Muscle Group</StyledTableCell>
                                    <StyledTableCell align="center">Exercise Name</StyledTableCell>
                                    <StyledTableCell align="right">Equipment</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                <ExerciseList exerciseTerm={exerciseTerm} exerciseState={exerciseState} exerciseDispatch={exerciseDispatch} muscle_groups={muscle_groups} equipment={equipment} />
                                {/* //clients list // */}


                            </TableBody>
                        </Table>
                    </TableContainer>
                </motion.div>
            </motion.div>
        </>
    )
}

export default ExerciseTab