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
const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const ClientsList = ({ state, term, setModalToggled, setClientDetails, setHover, hover }) => {

    console.log("STATE", state)

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
            {state.clients.filter(user => user.FirstName.toLowerCase().includes(term.toLowerCase())).map((client, i) => {
                let FirstName = client.FirstName.charAt(0).toUpperCase() + client.FirstName.slice(1)
                let LastName = client.LastName.charAt(0).toUpperCase() + client.LastName.slice(1)
                let JoinDate = client.JoinDate.split('T')[0]
                let maxGoals = 5
                let clientCurr = client.thisWeeksWorkouts
                let clientGoal = parseInt(client.Goal)

                let currTotal = clientCurr / clientGoal
                console.log("YO PERECENTAGE", clientCurr)

                let goalPercentage = currTotal * 100
                console.log("GOAL PERECENTAGE", goalPercentage)

                return (

                    <StyledTableRow className="cursor-pointer" onClick={() => {
                        setClientDetails(client)
                        setModalToggled(true)
                    }}


                    >
                        <StyledTableCell className="flex flex-row "> <div className="flex flex-row items-center"><img className="rounded-full w-[30px] h-[30px] mr-3 " src={client.Avatar} /> {FirstName} {LastName}</div></StyledTableCell>
                        <StyledTableCell className="flex justify-center items-center w-[200px]" >



                            <motion.div className="table-progress-bar-striped max-w-[100%]">
                                <motion.div style={goalPercentage == 0 ? { color: "white", width: `10%`, maxWidth: "100%" } : { width: `${goalPercentage}%`, maxWidth: "100%" }}><b><p>{Math.round(goalPercentage)}%</p></b></motion.div>
                            </motion.div>

                        </StyledTableCell>
                        <StyledTableCell className="" align="center">{client.Email}</StyledTableCell>
                        <StyledTableCell className="" align="center">{client.Mobile}</StyledTableCell>
                        <StyledTableCell className="" align="center">{JoinDate}</StyledTableCell>

                    </StyledTableRow>
                )
            })}



        </>
    )
}

export default ClientsList