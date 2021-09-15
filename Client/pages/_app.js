import '../styles/globals.css'
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from "../theme"
import chakraTheme from "../chakratheme"
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Router from 'next/router';
import "nprogress/nprogress.css";
import NProgress from 'nprogress';


NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,

});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [loading, setLoading] = useState(false)
  // const Router = useRouter()
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);




  return (
    <React.Fragment>
      <Head>
        <title>Apex Training</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ChakraProvider resetCSS theme={chakraTheme}>
          <ColorModeProvider
            options={{
              useSystemColorMode: true,
            }}
          >

            <Component {...pageProps} />

          </ColorModeProvider>
        </ChakraProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
