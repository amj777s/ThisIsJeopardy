'use client'
import { useParams, useSearchParams } from 'next/navigation'
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import React from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { resetGame } from '@/redux/slices/gameDataSlice';
import { RestartState } from '@/types';



export default function EntryPage(){
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const entry= searchParams.get('entry');
    const startState:RestartState = {
        hearts: 3,
        score: 0,
        level: 1,
        sublevel: 1,
        playing: 'playing'
    };
   

    React.useEffect(()=> {
        dispatch(resetGame(startState));
    });
    
    return(
        <>
        {/* correct to signup */}
        {entry === "login" && <Login/>}
        {entry === "signup" && <SignUp/>}
        </>
    )
}