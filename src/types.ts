
export interface  RestartState {
    hearts: number,
    score: number,
    level: number,
    sublevel: number,
    playing: gameProgress,
};

export interface  GameState extends RestartState {
    roundData: RoundData []
};


export type RoundData = {
    question: string,
    category: string,
    score: number,
    answer: string
}


// Used to convert level into query searches. Possibly  move to Game Logic.ts or Route.ts
export const queryScores: number[] = [
    200,
    400,
    600,
    800,
    1200,
    1600,
    2000
];


// Used on root page to conditionally render game component
export type gameProgress = 'waiting' |'playing' | 'over';