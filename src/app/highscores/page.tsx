import { ScoreData } from "@/types";
import scores from './scores.module.css';
import Link from "next/link";
import '../../app/globals.css'

async function getHighscores() {
    const response = await fetch('http://localhost:3000/api/jeopardy/highscores');
    const highscores = await response.json();
    return highscores
}


export default async function Highscores() {
    const highscores: ScoreData[] = await getHighscores();
    return (
        <>
            <ul className={scores.scoreTable}>
                <li key='header' className={scores.score}>
                    <p>Rank</p>
                    <p>Score</p>
                    <p>Username</p>
                    <p>Date</p>
                </li>
                {highscores.map((data, index) =>
                    <li key={data.id + data.username} className={scores.score}>
                        <p>{index + 1}</p>
                        <p>{data.score}</p>
                        <p>{data.username}</p>
                        {/* exlcudes the time portion of the date */}
                        <p>{data.created.toString().split('T')[0]}</p>
                    </li>)}
            </ul>

            <Link className="activeButton w50-center r-15" href={{pathname: '/'}}>Back</Link>
        </>
    )
}