import { useSelector } from "react-redux";
import react, { useEffect, useState } from "react";
import Router from 'next/router'


export default function requireAuthentication(gssp) {
    return async (context) => {
        const { req, res } = context;
        const token = req?.headers.cookie // Add logic to extract token from `req.headers.cookie`
        console.log("TOKEN FIRED", token)
        if (!token) {
            // Redirect to login page
            res.statusCode = 302;
            return {
                redirect: {
                    destination: '/login',
                    statusCode: 307
                }
            }

        }

        return await gssp(context); // Continue on to call `getServerSideProps` logic
    }
}