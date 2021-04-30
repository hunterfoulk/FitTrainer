import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from "../redux/store"
import { useDispatch, useSelector } from "react-redux"
import "react-datetime-picker/dist/DateTimePicker.css"
import "react-datetime-picker/dist/DateTimePicker.css"
import "react-clock/dist/Clock.css"
import { ChakraProvider } from "@chakra-ui/react"
import Topbar from "../components/dashboard/topbar"
import React, { useEffect, useState } from "react"



import App from 'next/app'

function MyApp({ Component, pageProps, AccountInfo }) {
  const [tabG, setTabG] = useState("Trainers")
  const [tabT, setTabT] = useState("Home")
  console.log("APP FIRED", AccountInfo)

  let yo = "yooo"

  return (
    <Provider store={store}>
      <ChakraProvider>
        {/* <Topbar /> */}
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp

// MyApp.getInitialProps = async context => {

//   console.log("SSR FIRED")
//   let cookie = context.req?.headers.cookie
//   const response = await fetch('http://localhost:9000/accountInfo', {
//     headers: {
//       cookie: cookie
//     }
//   });
//   // const appProps = await App.getInitialProps(context)
//   const res = await response.json()

//   console.log("ACCOUNT INFO", res)
//   return {
//     props: {

//       AccountInfo: res.data.AccountInfo || {},

//     },
//   }
// }
