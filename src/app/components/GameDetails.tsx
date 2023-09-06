
'use client'
import dashboard from '../dashboard.module.css';
import Image from 'next/image';
import heart from '../../../public/heart.png';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectHearts, selectLevel, selectScore, selectSubLevel } from '@/redux/slices/gameDataSlice';
import { addLife } from '@/redux/slices/gameDataSlice';


export default function GameDetails() {

    const hearts = useAppSelector(selectHearts);
    const level = useAppSelector(selectLevel);
    const sublevel = useAppSelector(selectSubLevel);
    const score = useAppSelector(selectScore);
    const dispatch = useAppDispatch();


    const updateLife = (e:React.MouseEvent<HTMLButtonElement>):void => {
        e.preventDefault();
        dispatch(addLife());

    }

    return (
        <div className={dashboard.gameDetails}>
            <h2>Lives</h2>
            <div className={dashboard.hearts}>
                {Array(hearts).fill( <Image
                    src={heart}
                    alt='image of heart'
                    width={50}
                    height={50}
                />)}
            </div>
            <p>Score: {score}</p>
            <h2>Level {level}</h2>
            <h3 className= {sublevel == 1 ? dashboard.active : dashboard.white}>Question 1</h3>
            <h3 className= {sublevel == 2 ? dashboard.active : dashboard.white}>Question 2</h3>
            <h3 className= {sublevel == 3 ? dashboard.active : dashboard.white}>Question 3</h3>
            <h3 className= {sublevel == 4 ? dashboard.active : dashboard.white}>Question 4</h3>
            <h3 className= {sublevel == 5 ? dashboard.active : dashboard.white}>Question 5</h3>
        </div>
    )
}