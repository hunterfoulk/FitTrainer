import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from "../redux/store"
import { useDispatch, useSelector } from "react-redux"
import "react-datetime-picker/dist/DateTimePicker.css"
import "react-datetime-picker/dist/DateTimePicker.css"
import "react-clock/dist/Clock.css"
import { ChakraProvider } from "@chakra-ui/react"





import App from 'next/app'

function MyApp({ Component, pageProps }) {



  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
// MyApp.getInitialProps = async (ctx) => {
//   // console.log("context", ctx)
//   const cookie = ctx.req?.headers;
//   // console.log("APP COOKIE:", cookie)

//   const appProps = await App.getInitialProps(ctx)
//   // console.log("app props", appProps)
//   return { ...appProps }
// }