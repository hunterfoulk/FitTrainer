import { useSelector } from "react-redux";
import react, { useEffect, useState } from "react";
import Router from 'next/router'


export default function requireAuthentication(gssp) {
    return async (context) => {
        const { req, res } = context;
        console.log("HEADERS", req?.headers)
        const token = req?.headers.cookie // Add logic to extract token from `req.headers.cookie`
        console.log("TOKEN FIRED", token)
        if (token) {
            // Redirect to login page
            return {
                redirect: {
                    destination: '/dashboard',
                    statusCode: 307
                }
            }

        }

        return await gssp(context); // Continue on to call `getServerSideProps` logic
    }
}