//TODO: add bcrypt to login page to check db for users

import { RestartState } from '@/types';
import '../../app/globals.css';
import { useAppDispatch, useAppSelector, } from '@/redux/hooks';
import { resetGame, getRoundData, selectLevel, selectScore } from '@/redux/slices/gameDataSlice';
import Link from 'next/link';
import { useCookies } from 'next-client-cookies';
import { useEffect, useState } from 'react';
import { json } from 'stream/consumers';

export default function GameOver() {

    const dispatch = useAppDispatch();
    const level = useAppSelector(selectLevel);
    const cookies = useCookies();
    const score = useAppSelector(selectScore);
    const user = cookies.get('user');
    const [scoreSubmitted, setScoreSubmitted] = useState(false);


    const submitScore = async () => {
        if(user && !scoreSubmitted){
            const scoredata = {
                username: user,
                score: score
            };

            const scoreDataJson = JSON.stringify(scoredata);
            const response = await fetch('/api/jeopardy/highscores',{
                                        method: 'POST',
                                        body: scoreDataJson
            });
            if(response.ok){
                setScoreSubmitted(true);
            }
        }
    }

    const handleStartOver = async () => {

        const startState: RestartState = {
            hearts: 3,
            score: 0,
            level: 1,
            sublevel: 1,
            playing: 'playing'
        };

        //prevents get round data from being called again in Gameshell useEffect
        if (level === 1) {
            dispatch(getRoundData(1));
        }
        dispatch(resetGame(startState));

        await submitScore();


    }



    return (
        <>
            <h2>Nice try. Think you can do better?</h2>
            {/* should only show if they are not logged in */}
            {!user && <p>Create an account to have scores saved into database.</p>}
            {!user && <p>Already A User? <Link href={{ pathname: '/login', query: { entry: 'login' } }}>Login</Link></p>}
            {!user && <p>Don&apos;t Have An Account?<Link href={{ pathname: '/login', query: { entry: 'signup' } }}>Sign Up</Link></p>}
            <Link onClick={submitScore} href={{ pathname: '/highscores' }}>View Highscores</Link>
            <button className='activeButton' onClick={handleStartOver}>Try Again?</button>
        </>
    )
}