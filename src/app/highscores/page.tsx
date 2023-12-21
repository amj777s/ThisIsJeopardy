'use client'
import { ScoreData} from "@/types";
import scores from './scores.module.css';
import Link from "next/link";
import '../../app/globals.css'
import useSWR from "swr";

async function getHighscores() {
    const response = await fetch('/api/jeopardy/highscores');
    const highscores = await response.json();
    return highscores
}

export default function Highscores() {
    const { data, error, isLoading } = useSWR('/api/starlight/highscores', getHighscores);
    const screenWidth = window.screen.width;
    console.log(screenWidth);

    if(error){
        return <h1>{error}</h1>
    }

    if (isLoading) {
        return (
            <div className="container-no-align">
                <h1>Loading...</h1>
                <div className="loading "></div>
            </div>
        )

    }

    let content;

    // Used to create better table layout for mobile
    if(screenWidth < 800){
        content = (
            
            <div className={scores.scoreBox}>
                {data.map((info:ScoreData, index:number) =>
                    <div key={info.id + info.username}  className={scores.scoreMobile}>
                        <h3>Rank: {index + 1}</h3>
                        <hr />
                        <p>Username: {info.username}</p>
                        <p>Score: {info.score}</p>
                        <p>{info.created.toString().split('T')[0]}</p>
                    </div>
                   
                )}
            </div>
            
        )
    }else{
        content= (
            <ul className={scores.scoreTable}>
                <li key='header' className={scores.score}>
                    <p>Rank</p>
                    <p>Score</p>
                    <p>Username</p>
                    <p>Date</p>
                </li>
                {data.map((info:ScoreData, index:number) =>
                    <li key={info.id + info.username} className={scores.score}>
                        <p>{index + 1}</p>
                        <p>{info.score}</p>
                        <p>{info.username}</p>
                        {/* exlcudes the time portion of the date */}
                        <p>{info.created.toString().split('T')[0]}</p>
                    </li>)}
            </ul>
            

        )
    }
    return (
        <>
            {content}
            <Link className="activeButton w50-center r-15" href={{pathname: '/'}}>Back</Link>
        </>
    )
}