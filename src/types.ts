
export interface  GameState {
    hearts: number,
    roundData: RoundData []
    score: number,
    level: number,
    sublevel: number,
    playing: gameProgress,
};

export type RoundData = {
    question: string,
    category: string,
    score: number,
    answer: string
}

// used to convert level into query searches. Possibly  move to Game Logic.ts or Route.ts
export const queryScores: number[] = [
    200,
    400,
    600,
    800,
    1200,
    1600,
    2000
];

export type gameProgress = 'waiting' |'playing' | 'over';