import React from 'react'
import styles from "../styles/dashboard/Dashboard.module.scss"
import Sidebar from "../components/dashboard/sidebar"
import Topbar from "../components/dashboard/topbar"
import { NextPageContext } from "next"
import { useDispatch, useSelector } from "react-redux"
import { authTrue, authFalse } from "../redux/authSlice"
import { NextPage } from 'next'
import { Auth } from "./auth/auth"
import fetch from "isomorphic-unfetch"

interface Props {
    users: any,
    role: string
}


const Dashboard: NextPage<Props> = ({ users, role }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state: any) => state.auth);
    console.log("USERS:", users)



    return (
        <>
            {role === "Gym" ? <div> {users.map((user, i) => (


                <h1>{user.Email}</h1>
            ))} </div> : <div className={styles.dashboard_main}>
                <div className={styles.sidebar_container}>

                    <Sidebar />
                </div>
                <div className={styles.dashboard_main_right_container}>

                    <div className={styles.topbar_container}>
                        <Topbar />
                    </div>

                    <div>
                        {users.map((user, i) => (

                            <h1>{user.Email}</h1>
                        ))}
                    </div>
                </div>


            </div>}

        </>
    )
}

Dashboard.getInitialProps = async (ctx: NextPageContext) => {

    const response = await Auth('http://localhost:9000/dashboard', ctx);
    console.log("ROLE CHECK", response.data.role)
    return {
        users: response.data.response,
        role: response.data.role
    }



};
export default Dashboard
