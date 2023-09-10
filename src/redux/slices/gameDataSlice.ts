import {createSlice, AsyncThunk, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { GameState, RestartState, RoundData } from '@/types';


const initState: GameState = {
        hearts: 3,
        roundData: [], // change back to empty after test
        score: 0,
        level: 1,
        sublevel: 1,
        playing: 'waiting'    
};

// Update to handle
export const getRoundData = createAsyncThunk(
    'gameData/getRoundData',

    async(level: number) => {
        const response: Response = await fetch(`/api/jeopardy/level/${level}`)
        if(response.ok){
            const data: RoundData[] = await response.json();
            return data;
        }

    }
);

const options =  {
    name: 'gameData',
    initialState: initState,
    reducers: {

        // HEARTS Section
        subtractLife: (state:GameState) => {
            state.hearts -= 1;
        },

        addLife: (state:GameState) => {
            state.hearts += 1;
        },

        //SCORE SECTION

        updateScore: (state:GameState, action: PayloadAction<number>) => {
            state.score += action.payload;
        },

        //LEVEL SECTION
        incrementLevel: (state: GameState) => {
            state.level += 1;
        },

        //SUBLEVEL SECTION
        
        incrementSubLevel: (state:GameState) =>  {
            state.sublevel += 1;
        },

        resetSubLevel: (state: GameState) => {
            state.sublevel = 1;
;        },

        // UPDATING Playing Status
        startGame: (state:GameState) => {
            state.playing = 'playing';
        },

        endGame: (state: GameState) => {
            state.playing = 'over';
        },

        resetGame: (state: GameState, action: PayloadAction<RestartState>) => {
            // Figure out why spread operator wasnt working
            const{hearts,level,sublevel,playing,score} = action.payload;
            state.hearts = hearts;
            state.level = level;
            state.sublevel = sublevel;
            state.playing = playing;
            state.score = score;
           
        }
    },

    // Find solution for builder type
    extraReducers: (builder:any) => {
        builder.addCase(getRoundData.pending, (state:GameState,) => {
            
        });
        
        builder.addCase(getRoundData.fulfilled, (state:GameState, action: PayloadAction<RoundData[]>) => {
            state.roundData = action.payload;
        });
        
    }
};

const gameDataSlice = createSlice(options);
export const {subtractLife, addLife, updateScore, endGame, startGame, resetGame,incrementSubLevel, resetSubLevel, incrementLevel} = gameDataSlice.actions;
export const selectHearts = (state:RootState) => state.gameData.hearts;
export const selectScore = (state:RootState) => state.gameData.score;
export const selectLevel = (state:RootState) => state.gameData.level;
export const selectRoundData = (state:RootState) => state.gameData.roundData;
export const selectSubLevel = (state:RootState) => state.gameData.sublevel;
export const selectGameStatus = (state:RootState) => state.gameData.playing;
export default gameDataSlice.reducer;
