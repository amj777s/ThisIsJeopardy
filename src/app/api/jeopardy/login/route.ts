import { NextRequest, NextResponse } from "next/server";
import {cookies} from 'next/headers';
import prisma from "../../../../../prisma/prisma";
import { checkPassword } from "@/app/utils/signupHelper";


/**
 * 
 * @param req - Request object containing sign up JSON data {username, password}
 * @returns - Returns a status of 201 if sucessful and an empty body
 */
export async function POST(
    req: NextRequest
) {
    const { username, password } = await req.json();
    // should only return an array with one or zero objects since each username is a unique value

    const queryResults: { hash: string }[] = await prisma.$queryRaw`SELECT hash from jeopardy_users WHERE username = ${username}`;

    if (queryResults.length === 0) {
        return NextResponse.json({ loginAccepted: false }, { status: 200 });
    }

    const hash = queryResults[0].hash;
    const loginAccepted:boolean = await checkPassword(password, hash); 
    const oneWeek = 60 *60 * 24 * 7;
    
    // create cookie so users dont have to log in after each reload;
    if(loginAccepted) {
        cookies().set('user', username, {secure: true, maxAge: oneWeek, sameSite: 'strict'});
       
    }

    return NextResponse.json({loginAccepted: loginAccepted}, {status: 200});

}