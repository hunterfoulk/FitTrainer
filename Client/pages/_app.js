import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from "../redux/store"
import { useDispatch, useSelector } from "react-redux"

// import "@fullcalendar/common/main.min.css";
// import "@fullcalendar/daygrid/main.min.css";


import App from 'next/app'

function MyApp({ Component, pageProps }) {



  return (
    <Provider store={store}>
      <Component {...pageProps} />
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