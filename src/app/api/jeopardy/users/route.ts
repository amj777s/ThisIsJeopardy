import {NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { generatePasswordHash } from "@/app/utils/signupHelper";


/**
 * 
 * @param req - Request object containing sign up JSON data {username, email, password}
 * @returns - Returns a status of 201 if sucessful and an empty body
 */
export async function POST(
    req: NextRequest
){
  const {username, email, password} = await req.json();
  // should only return an array with one or zero objects since each username is a unique value

  const hash: string = await generatePasswordHash(password);
  const dateString= new Date();

  // Will return an empty array if no errors are thrown
  const data: [] = await prisma.$queryRaw`INSERT INTO starlight_users (username, email, hash, created) VALUES(${username},${email}, ${hash}, ${dateString})`;
  
  // Write error handler for problem with db
  if (data.length === 0){
    return NextResponse.json({username}, {status: 201});
  }

}