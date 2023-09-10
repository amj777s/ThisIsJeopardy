
'use client'
import dashboard from '../dashboard.module.css';
import '../../app/globals.css';
import Image from 'next/image';
import heart from '../../../public/heart.png';
import { useAppSelector } from '@/redux/hooks';
import { selectHearts, selectLevel, selectScore, selectSubLevel } from '@/redux/slices/gameDataSlice';


export default function GameDetails() {

    const hearts = useAppSelector(selectHearts);
    const level = useAppSelector(selectLevel);
    const sublevel = useAppSelector(selectSubLevel);
    const score = useAppSelector(selectScore);

    return (
        <div className={dashboard.gameDetails}>
            <h2>Lives</h2>
            <div className={dashboard.hearts}>
                {Array(hearts).fill(<Image
                    src={heart}
                    alt='image of heart'
                    width={50}
                    height={50}
                />)}
            </div>
            <h2>Score: {score}</h2>
            <div className={dashboard.levels}>
                <h2>Level {level}</h2>
                <h3 className={sublevel == 1 ? 'active' :'white'}>Question 1</h3>
                <h3 className={sublevel == 2 ? 'active' :'white'}>Question 2</h3>
                <h3 className={sublevel == 3 ? 'active' :'white'}>Question 3</h3>
                <h3 className={sublevel == 4 ? 'active' :'white'}>Question 4</h3>
                <h3 className={sublevel == 5 ? 'active' :'white'}>Question 5</h3>
            </div>
        </div>
    )
}