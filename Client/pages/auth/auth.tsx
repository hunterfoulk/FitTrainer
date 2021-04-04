import React, { useEffect } from 'react'
import { withRouter, useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
const login = '/login';
import { NextPageContext } from "next";

export async function Auth(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie;

    const resp = await fetch(url, {
        headers: {
            cookie: cookie!
        }
    });

    if (resp.status === 401 && !ctx.req) {
        Router.replace('login');
        return {};
    }

    if (resp.status === 401 && ctx.req) {
        ctx.res?.writeHead(302, {
            Location: login
        });
        ctx.res?.end();
        return;
    }

    const json = await resp.json();
    return json;
}