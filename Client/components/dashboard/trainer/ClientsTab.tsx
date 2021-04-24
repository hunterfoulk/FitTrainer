import React, { useState } from 'react'
import styles from "../../../styles/dashboard/ClientsTab.module.scss"
import ClientsListTab from './ClientsListTab'
import RegisterClientTab from './RegisterClientTab'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Add from '@material-ui/icons/Add';
interface Props {
    AccountInfo: any
    TodaysClients: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
);

const ClientsTab: React.FC<Props> = ({ AccountInfo, TodaysClients }) => {
    const [tab, setTab] = useState<string>("Home")
    const classes = useStyles();

    return (
        <>
            <div className={styles.clients_tab_main}>
                <div className={styles.clients_tab_header}>
                    <div>
                        <span>Clients</span>
                    </div>
                    <div>
                        {tab === "Home" && <Button onClick={() => setTab("Back")}
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<Add />}
                        >
                            Add Client
                         </Button>}
                        {tab === "Back" && <> <Button onClick={() => setTab("Home")}
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<ArrowBack />}
                        >
                            Back
                         </Button> </>
                        }


                    </div>
                </div>
                <div className={styles.clients_tab_content_container}>
                    {tab === "Home" && <ClientsListTab TodaysClients={TodaysClients} />}
                    {tab === "Back" && <RegisterClientTab AccountInfo={AccountInfo} />}
                </div>
            </div>
        </>
    )
}

export default ClientsTab