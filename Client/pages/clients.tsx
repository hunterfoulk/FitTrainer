import React, { useState, useReducer } from 'react'
import requireAuthentication from "./auth/authtwo"
import Layout from "../components/layout"
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
import Modal from "../components/dashboard/trainer/ClientModal"
import CreateModal from "../components/dashboard/trainer/CreateClientModal"
import ClientsList from "../components/dashboard/trainer/ClientsList"


interface Props {
    AccountInfo: any
    role: any
    clients: any
}
// bg - [#EBF2F8]

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
        minWidth: 500,
    },
});

//CLIENTS REDUCER//
const reducer = (state, action) => {
    console.log("FIRED", action)
    switch (action.type) {

        case "UPDATE":
            return {
                ...state,
                clients: [...state.clients, action.client]
            };
        case "FILTER":
            return {
                ...state,
                clients: state.clients.filter((item, i) => item.ClientId !== action.id),
            };
        case "CHANGED":
            return {
                ...state,
                clients: state.clients.map(client => (action.client.ClientId === client.ClientId ? { ...client, ...action.client } : client))
            }


        default:
            return state;
    }
};






const Clients: React.FC<Props> = ({ AccountInfo, role, clients }) => {
    const classes = useStyles();
    const [term, setTerm] = useState("")
    const [hover, setHover] = useState(false);
    const [isModalToggled, setModalToggled] = useState(false)
    const [isCreateModalToggled, setCreateModalToggled] = useState(false)
    const [clientDetails, setClientDetails] = useState({})
    const initialState = { clients: clients };
    const [state, dispatch] = useReducer(reducer, initialState);



    return (
        <>
            <Modal setModalToggled={setModalToggled} isModalToggled={isModalToggled} clientDetails={clientDetails} state={state} dispatch={dispatch} />
            <CreateModal setCreateModalToggled={setCreateModalToggled} isCreateModalToggled={isCreateModalToggled} AccountInfo={AccountInfo} dispatch={dispatch} />
            <Layout AccountInfo={AccountInfo} role={role}>
                <div className="main flex flex-col w-full items-center py-3 px-4 overflow-x-hidden overflow-y-auto bg-[white]">
                    <div className="header flex justify-between w-full h-[50px] justify-center max-w-[1400px] mt-3 border-b-1 border-[#e9e9e9] px-1" style={{ fontFamily: "Roboto, sans-serif", letterSpacing: "1px" }}>
                        <div className="flex flex-1 items-center py-2">
                            <h1 className="text-[22px] text-[#414141] font-bold">Clients</h1>
                        </div>
                        <div className="flex flex-1 w-full justify-end items-center py-2 ">
                            <InputGroup className="w-full max-w-[1400px]">
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<SearchIcon color="gray.300" />}
                                />
                                <Input type="text" placeholder="Search..." value={term} onChange={(e: any) => setTerm(e.target.value)} />
                            </InputGroup>
                            <Fab onClick={() => setCreateModalToggled(true)} className="h-[30px]" color="primary" aria-label="add" style={{ backgroundColor: "#ee2b45", height: "38px", width: "42px", marginLeft: "8px", outline: "none" }}>
                                <AddIcon style={{ outline: "none" }} />
                            </Fab>
                        </div>
                    </div >

                    <TableContainer component={Paper} className="w-full max-w-[1400px] overflow-x-hidden overflow-y-hidden mt-5 ">
                        <Table className={classes.table} aria-label="customized table ">
                            <TableHead >
                                <TableRow>
                                    <StyledTableCell >Client Name</StyledTableCell>
                                    <StyledTableCell align="center">Goal</StyledTableCell>
                                    <StyledTableCell align="center">Email</StyledTableCell>
                                    {/* <StyledTableCell align="center">Mobile</StyledTableCell>
                                        <StyledTableCell align="center">Joined</StyledTableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {/* //clients list // */}
                                <ClientsList setClientDetails={setClientDetails} state={state} hover={hover} setModalToggled={setModalToggled} term={term} setHover={setHover} />

                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </Layout>
        </>
    )
}

export default Clients



export const getServerSideProps = requireAuthentication(async context => {


    let cookie = context.req?.headers.cookie
    const response = await fetch('http://localhost:9000/clientsRoute', {
        headers: {
            cookie: cookie!
        }
    });
    const res = await response.json()
    console.log("RESPONSE FOR Clients", res)

    return {
        props: {
            AccountInfo: res.data.AccountInfo,
            role: res.data.role,
            clients: res.data.clients

        },
    }
})


