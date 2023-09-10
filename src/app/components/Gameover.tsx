//TODO: add bcrypt to login page to check db for users

import {RestartState } from '@/types';
import dashboard from '../dashboard.module.css';
import '../../app/globals.css';
import { useAppDispatch, useAppSelector,} from '@/redux/hooks';
import { resetGame,getRoundData, selectLevel } from '@/redux/slices/gameDataSlice';
import Link from 'next/link';

export default function GameOver() {
    
    const dispatch = useAppDispatch();
    const level = useAppSelector(selectLevel);
    
    const handleStartOver = () => {
        
        const startState:RestartState = {
            hearts: 3,
            score: 0,
            level: 1,
            sublevel: 1,
            playing: 'playing'
        };

        //prevents get round data from being called again in Gameshell useEffect
        if(level === 1){
            dispatch(getRoundData(1));
        }
        dispatch(resetGame(startState));
      

    }
    
    return (
        <>
            <h2>Nice try. Think you can do better?</h2>
            {/* should only show if they are not logged in */}
            <p>Create an account to have scores saved into database.</p> 
            <p>Already A User? <Link href={{pathname:'/login', query:{entry: 'login'}}}>Login</Link></p>
            <button className='activeButton' onClick={handleStartOver}>Try Again?</button>
        </>
    )
}