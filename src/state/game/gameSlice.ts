/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import levels from "../../levels/levels";

interface GameState {
  lives: number;
  difficulty: "easy" | "medium" | "hard";
  land: number;
  letter: number;
  completedLetters: string[];
  activity: number;
  completedActivities: number[][];

  completionTimes: number[];
  lastCompletedLetterAt: number;
  finishingTimes: number[];
  amountCorrect: number | null;
  score: number | null;
  completedWords: string[];
}

const initialGameState: GameState = {
  lives: 5,
  difficulty: "easy",
  land: 0,
  letter: 0,
  activity: 0,
  completedActivities: [],
  completedLetters: [],
  completionTimes: [],
  lastCompletedLetterAt: new Date().getTime(),
  finishingTimes: [],
  amountCorrect: null,
  score: 0,
  completedWords: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialGameState,
  reducers: {
    incrementLives: (state) => {
      state.lives += 1;
    },
    decrementLives: (state) => {
      if (state.lives > 0) state.lives -= 1;
    },
    changeDifficulty: (
      state,
      action: PayloadAction<"easy" | "medium" | "hard">,
    ) => {
      state.difficulty = action.payload;
    },
    incrementLand: (state) => {
      state.land += 1;
    },
    decrementLand: (state) => {
      if (state.land > 1) state.land -= 1;
    },
    incrementLetter: (state) => {
      const currentLevel = levels[state.land];
      if (state.letter < currentLevel.length - 1) {
        state.letter += 1;
      } else {
        state.land += 1;
        state.letter = 0;
      }
    },
    decrementLetter: (state) => {
      state.letter += 1;
    },
    addAchievedLetter: (state, action: PayloadAction<string>) => {
      state.completedLetters.push(action.payload);
    },
    addCompletionTime: (state, action: PayloadAction<number>) => {
      state.completionTimes.push(action.payload);
    },
    addFinishingTime: (state, action: PayloadAction<number>) => {
      state.finishingTimes.push(action.payload);
    },
    updateAmountCorrect: (state, action: PayloadAction<number>) => {
      state.amountCorrect = action.payload;
    },
  },
});

export const {
  incrementLives,
  decrementLives,
  changeDifficulty,
  incrementLand,
  decrementLand,
  incrementLetter,
  decrementLetter,
  addAchievedLetter,
  addCompletionTime,
  addFinishingTime,
  updateAmountCorrect,
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
