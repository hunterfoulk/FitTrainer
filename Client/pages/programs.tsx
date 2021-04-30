import React, { useState, useReducer } from 'react'
import styles from "../styles/dashboard/ProgramsTab.module.scss"
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Add from '@material-ui/icons/Add';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Input } from "@chakra-ui/react"
import { InputGroup } from "@chakra-ui/react"
import { InputLeftElement } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { useDisclosure } from "@chakra-ui/react"
import Modal from "../components/dashboard/trainer/ProgramsModal"
import requireAuthentication from "./auth/authtwo"
import Topbar from "../components/dashboard/topbar"
import stylesTwo from "../styles/dashboard/Dashboard.module.scss"
import Layout from "../components/layout"

interface Props {
    AccountInfo: any
    exerciseList: any
    role: any
    workouts: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
);



const initialState = { list: [] };





const Programs: React.FC<Props> = ({ AccountInfo, exerciseList, role, workouts }) => {
    const [tab, setTab] = useState<string>("Home")
    const classes = useStyles();
    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <>
            {/* <div className={stylesTwo.topbar_container}>
                <Topbar AccountInfo={AccountInfo} setTabG={setTabG} tabG={tabG} setTabT={setTabT} tabT={tabT} role={role} />
            </div> */}
            <Layout AccountInfo={AccountInfo} role={role}>
                <div className={styles.programs_tab_main}>

                    <Modal onOpen={onOpen} onClose={onClose} isOpen={isOpen} exerciseList={exerciseList} AccountInfo={AccountInfo} />
                    <div className={styles.programs_tab_header}>
                        <h1>Programs List</h1>
                        {tab === "Home" && <Button onClick={() => setTab("Back")}
                            variant="contained"
                            color="secondary"
                            className={classes.button}

                        >
                            Exercise List
                         </Button>}
                        {tab === "Back" && <> <Button onClick={() => setTab("Home")}
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                        >
                            Porgrams List
                         </Button> </>
                        }
                    </div>

                    <div className={styles.programs_tab_buttons}>
                        <Button
                            onClick={onOpen}
                            variant="contained"
                            color="secondary"
                            className={classes.button}

                        >
                            Create Program
                         </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}

                        >
                            Delete Program
                         </Button>
                    </div>
                    <div className={styles.programs_tab_input}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<SearchIcon color="gray.300" />}
                            />
                            <Input type="tel" placeholder="Search Programs..." />
                        </InputGroup>
                    </div>
                    <div className={styles.content_container}>
                        <div className={styles.row_header}>
                            <div>
                                <span>Name</span>
                            </div>
                            <div>
                                <span>Exercises</span>
                            </div>
                            <div>
                                <span>Date Created</span>
                            </div>
                            <div>
                                <span>Edit</span>
                            </div>
                        </div>
                        {workouts.map((workout: any) => {
                            let myDate = workout.JoinDate.split(' ')[0]
                            return (
                                <div className={styles.workout}>
                                    <div>
                                        <span>{workout.workout_name}</span>
                                    </div>
                                    <div>
                                        {workout.exercises.map((exercise: any) => (
                                            <>
                                                <span className={styles.exercise}>{exercise.Name}</span>

                                            </>
                                        ))}
                                    </div>
                                    <div>
                                        <span>{myDate}</span>
                                    </div>
                                    <div>
                                        <span>Edit</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>


                </div>

            </Layout>
        </>
    )
}

export default Programs


export const getServerSideProps = requireAuthentication(async context => {


    let cookie = context.req?.headers.cookie
    const response = await fetch('http://localhost:9000/trainersPrograms', {
        headers: {
            cookie: cookie!
        }
    });
    const res = await response.json()
    console.log("RESPONSE FOR PROGRAMS", res)

    return {
        props: {
            exerciseList: res.data.exerciseList,
            AccountInfo: res.data.AccountInfo,
            role: res.data.role,
            workouts: res.data.workouts

        },
    }
})


