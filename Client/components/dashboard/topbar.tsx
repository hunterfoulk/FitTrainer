import React, { useState } from 'react'
import styles from "../../styles/dashboard/Topbar.module.scss"
import { FaRegBell } from 'react-icons/fa';
// import { Drawer } from 'godspeed'
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "../dashboard/sidebar"
import TrainerSidebar from "../dashboard/trainerSidebar"
import MenuIcon from '@material-ui/icons/Menu';
interface Props {
    AccountInfo: any
    setTabG: any
    tabG: any
    setTabT: any
    tabT: any

}
const useStyles = makeStyles({
    list: {
        width: 300,
        display: "flex",
        alignItems: "stretch"
    },
    paper: {
        width: 350,
        display: "flex",
        alignItems: "stretch"
    }
});

const Topbar: React.FC<Props> = ({ AccountInfo, setTabG, tabG, setTabT, tabT }) => {
    // const [open, setOpen] = useState(false)
    const classes = useStyles();
    const [state, setState] = React.useState({

        left: false,

    });


    const toggleDrawer = (side, open) => event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"

            onKeyDown={toggleDrawer(side, false)}
        >
            {AccountInfo.TrainerId ? <TrainerSidebar setTabT={setTabT} tabT={tabT} /> : <Sidebar setTabG={setTabG} tabG={tabG} />}

        </div>
    );

    return (
        <>
            <div className={styles.topbar}>

                <div className={styles.topbar_empty_container}>
                    <MenuIcon className={styles.menu_icon} onClick={toggleDrawer("left", true)} />
                </div>
                <div className={styles.topbar_notification_container}>
                    <FaRegBell />
                </div>
                <div className={styles.topbar_profile_container}>

                    <span>A</span> <span>{AccountInfo.GymName}</span>
                </div>
                <Drawer
                    className={classes.paper}
                    BackdropProps={{ invisible: true }}
                    open={state.left}
                    onClose={toggleDrawer("left", false)}
                >
                    {sideList("left")}
                    {/* <Sidebar setTabG={setTabG} tabG={tabG} />
                    sideList */}
                </Drawer>
            </div>
        </>
    )
}

export default Topbar