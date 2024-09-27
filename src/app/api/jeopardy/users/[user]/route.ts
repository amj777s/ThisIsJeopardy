
import {NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";
import { queryScores } from "@/types";


export async function GET(
    req: Request, // Has to be included to access params
   { params }: { params: { user: string } }
) {

    let username:string = params.user;
   
    //query returns an array of objects from users db
    const users: {username: string}[] = await prisma.$queryRaw`SELECT username from jeopardy_users where username = ${username}`;
    
    let status: number;

    // Fix to handle other types of errors
    // Need to catch 500 Error to ask to try and reload again;
    
    return users.length === 0 ? NextResponse.json({}, {status:200}):  NextResponse.json(users[0], {status:200});
};  