import React, { useState } from 'react'
import styles from "../../../styles/dashboard/ProgramsTab.module.scss"
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Add from '@material-ui/icons/Add';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Input } from "@chakra-ui/react"
import { InputGroup } from "@chakra-ui/react"
import { InputLeftElement } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { useDisclosure } from "@chakra-ui/react"
import Messenger from '../trainersTab/messenger/messenger';
import Modal from "./ProgramsModal"


interface Props {
    AccountInfo: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
);

const ProgramsTab: React.FC<Props> = ({ AccountInfo }) => {
    const [tab, setTab] = useState<string>("Home")
    const classes = useStyles();
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <div className={styles.programs_tab_main}>
                <Modal onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProgramsTab