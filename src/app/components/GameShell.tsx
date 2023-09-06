// TODO: useEffect to track game status 
'use client'
import dashboard from '../dashboard.module.css'
import React from 'react';
import { selectGameStatus, selectScore, startGame, updateScore, subtractLife, selectRoundData, selectSubLevel,resetSubLevel, incrementLevel, selectHearts, endGame, incrementSubLevel, selectLevel, getRoundData } from '@/redux/slices/gameDataSlice';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { RoundData } from '@/types';


export default function GameShell() {
    
    const welcomeMessage: string = 'Welcome to the Jeopardy trivia game. Where your knowledge will be tested on all categories of jeopardy from the very beginning.';
    const [userInput, setUserInput] = React.useState<string>('')

    const dispatch = useAppDispatch();

    const sublevel = useAppSelector(selectSubLevel);
    const level = useAppSelector(selectLevel);
    const roundData = useAppSelector(selectRoundData);
    const hearts = useAppSelector(selectHearts);
    const gameStatus = useAppSelector(selectGameStatus);

        //Use to implement game over function
    React.useEffect(() => {
        if(!hearts){    
            dispatch(endGame());
        }
    }, [hearts]);

    // Use to fetch next round info
    React.useEffect( () => {
        dispatch(getRoundData(level - 1));
    }, [level]);

    const handleGameStatus = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        dispatch(startGame());

    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const formattedUserAnswer = e.target.value.toLowerCase().trim();
        setUserInput(formattedUserAnswer);
    }

    const checkAndUpdateLevel = (): void => {
        if (sublevel == 5) {
            dispatch(resetSubLevel());
            dispatch(incrementLevel());
            return;
        }

        dispatch(incrementSubLevel());
    }

    const checkLives = (): void => {
 
        if (hearts === 0) {
            dispatch(endGame());
           
        }
    }


    const handleCheckAnswer = (e: React.KeyboardEvent<HTMLInputElement>): void => {

        if (e.key === 'Enter') {
            const { value, answer } = roundData[sublevel - 1]; ///make sure answer is already foramtted to lowerCase on backend
            answer.includes(userInput) ? dispatch(updateScore(value)) : dispatch(subtractLife());
            // Used so that score level doesnt increment if game ends
          
            checkAndUpdateLevel();

        }

    }

    return (
        <div className={dashboard.questionSegment}>

            {/* Used to begin the game*/}
            {gameStatus === 'waiting' && <>
                <h2>{welcomeMessage}</h2>
                <button className={roundData.length === 0 ? dashboard.disabled: dashboard.activeButton } onClick={handleGameStatus} disabled={roundData.length === 0}> Begin Game</button>
            </>}
            {gameStatus === 'playing' && <>
                <p>Category: {roundData[sublevel - 1].category}</p>
                <h2>{roundData[sublevel - 1].question}</h2>
                <input type='text' onChange={handleUserInput} onKeyDown={handleCheckAnswer} placeholder='Enter Answer Here...' disabled = {hearts === 0} />
            </>}

        {gameStatus === 'over' && <>
            <h1>game over</h1>
            </>}
        </div>

    )
}   