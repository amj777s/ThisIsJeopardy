
export interface  GameState {
    hearts: number,
    roundData: RoundData []
    score: number,
    level: number,
    sublevel: number,
    playing: gameProgress;
};

export type RoundData = {
    question: string,
    category: string,
    value: number,
    answer: string
}

export type gameProgress = 'waiting' |'playing' | 'over';