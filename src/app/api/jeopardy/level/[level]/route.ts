// TODO: Add trigger into database so that on future calls if somebody enters a row with a score not equal to one in queryScores it rounds it to the nearest score
//       make query pull random questions
import {NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";
import { queryScores } from "@/types";


export async function GET(
    req: Request, // Has to be included to access params
   { params }: { params: { level: string } }
) {

    let level:number = Number(params.level) - 1; // subtract one to account for array index starting at zero
    // If a player makes it to maxium score continues to pull from highest questions for future rounds
   
    if (level >= queryScores.length){
        level = queryScores.length - 1;
    }
   const roundValue: number = queryScores[level];
   
    const data: object | null = await prisma.$queryRaw`SELECT * FROM game WHERE score = ${roundValue} ORDER BY RANDOM() LIMIT 5`;
    
    let status: number;

    // Fix to handle other types of errors
    // Need to catch 500 Error to ask to try and reload again
    typeof data === 'object'? status = 200 : status = 204;
    
    return NextResponse.json(
        data,
        {status: status}
    );
};  