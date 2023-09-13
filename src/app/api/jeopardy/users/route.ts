import {NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { generatePasswordHash } from "@/app/utils/signupHelper";

export async function POST(
    req: NextRequest
){
  const {username, email, password} = await req.json();
  // should only return an array with one or zero objects since each username is a unique value

  const hash: string = await generatePasswordHash(password);
  const dateString= new Date();

  // Will return an empty array if no errors are thrown
  const data: [] = await prisma.$queryRaw`INSERT INTO users (username, email, hash, created) VALUES(${username},${email}, ${hash}, ${dateString})`;
  
  // Write error handler for problem with db
  if (data.length === 0){
    return NextResponse.json({username}, {status: 201});
  }

}