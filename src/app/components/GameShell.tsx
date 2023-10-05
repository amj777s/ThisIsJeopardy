// TODO: useEffect to track game status 
'use client'
import dashboard from '../dashboard.module.css'
import '../../app/globals.css'
import React from 'react'
import {
    selectGameStatus,
    startGame,
    updateScore,
    subtractLife,
    selectRoundData,
    selectSubLevel, resetSubLevel,
    incrementLevel,
    selectHearts,
    endGame,
    incrementSubLevel,
    selectLevel,
    getRoundData
} from '@/redux/slices/gameDataSlice';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import GameOver from './Gameover';



export default function GameShell() {

    const welcomeMessage: string = 'Welcome to Jeopardy! You have three chances to test your knowledge in progressively harder rounds. Each Round is composed of\
                                    5 Questions and there is not time limit. There are over 200,000 questions that span the history of Jeopardy so chances are you will\
                                    not see the same question twice.Can you top the leaderboard? Goodluck! Make sure to create an account first if you want to save your score to\
                                    the leaderboard.';

    const [userInput, setUserInput] = React.useState<string>('');

    const dispatch = useAppDispatch();

    const sublevel = useAppSelector(selectSubLevel);
    const level = useAppSelector(selectLevel);
    const roundData = useAppSelector(selectRoundData);
    const hearts = useAppSelector(selectHearts);
    const gameStatus = useAppSelector(selectGameStatus);

    // Use to implement game over function
    React.useEffect(() => {
        if (!hearts) {
            setUserInput('');
            dispatch(endGame());
        }
    }, [hearts]);

    // Use to fetch next round info
    React.useEffect(() => {
        dispatch(getRoundData(level));
    }, [level]);


    /**
     * Used to control the what ui elements are available
     */
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


    const handleCheckAnswer = (e: React.KeyboardEvent<HTMLInputElement>): void => {

        if (e.key === 'Enter' && userInput) {
            const { score, answer } = roundData[sublevel - 1];
             const formattedAnswer = answer.toLowerCase().trim();
            formattedAnswer.includes(userInput) ? dispatch(updateScore(score)) : dispatch(subtractLife());
            // Used so that score level doesnt increment if game ends
            checkAndUpdateLevel();

        }

    }

    return (
        <div className={dashboard.questionSegment}>

            {/* Used to begin the game*/}

            {gameStatus === 'waiting' && <>
                <h2>{welcomeMessage}</h2>
                <button 
                    className={roundData.length === 0 ? 'disabled' : 'activeButton'}
                    onClick={handleGameStatus}
                    disabled={roundData.length === 0}> Begin Game</button>
            </>}

            {(gameStatus === 'playing' && roundData) && <>
                <p>Category: {roundData[sublevel - 1].category}</p>
                <h3>{roundData[sublevel - 1].question}</h3>
                <input type='text'
                    onChange={handleUserInput}
                    onKeyUp={handleCheckAnswer}
                    placeholder='Enter Answer Here...'
                    disabled={hearts === 0}
                />
            </>}

            {gameStatus === 'over' && <>
                <GameOver />
            </>}
        </div>

    )
}   