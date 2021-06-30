import React from 'react'
import Layout from "../components/layout"
import requireAuthentication from "./auth/authtwo"


const Recents = ({ AccountInfo }) => {
    return (
        <>
            <Layout AccountInfo={AccountInfo} role="Trainer">
                
                <div>
                    <span>Recents</span>
           
                </div>
            </Layout>
              
        </>
    )
}

export default Recents

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

