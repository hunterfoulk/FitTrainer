import React, { Component } from 'react'
import Router from 'next/router'
import { useSelector } from "react-redux";


export default function withAuth(AuthComponent) {
    return class Authenticated extends Component {

        static async getInitialProps(ctx) {
            const token = ctx.req?.headers.cookie
            console.log("AUTH FIRED:", token)
            if (!token) {
                if (ctx.res) {
                    ctx.res.writeHead(302, {
                        Location: '/login'
                    })
                    ctx.res.end()
                } else {

                    Router.replace('login');
                }
            }
            // Check if Page has a `getInitialProps`; if so, call it.
            const pageProps = AuthComponent.getInitialProps && await AuthComponent.getInitialProps(ctx);
            console.log("PAGE PROPS:", pageProps)
            // Return props.
            return { ...pageProps, token }
        }

        render() {
            return (

                <AuthComponent {...this.props} />

            )
        }
    }
}