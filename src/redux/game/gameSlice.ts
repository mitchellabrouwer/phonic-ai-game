/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import miniGames from "../../levels/games";
import levels from "../../levels/levels";
import { DifficultyLevel } from "../../types/types";

interface GameState {
  lives: number;
  difficulty: DifficultyLevel;

  land: number;
  letter: number;
  miniGame: number;
  completedLetters: string[];
  completedMiniGames: number[];

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
  miniGame: 0,
  completedMiniGames: [],
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

    incrementMiniGame: (state) => {
      const currentLetterGames = miniGames[state.letter];
      if (state.miniGame < currentLetterGames.length - 1) {
        state.miniGame += 1;
      } else {
        const currentLevel = levels[state.land];
        if (state.letter < currentLevel.length - 1) {
          // Move to the next letter
          state.letter += 1;
          state.miniGame = 0;
        } else {
          // Move to the next land and reset letter and miniGame
          state.land += 1;
          state.letter = 0;
          state.miniGame = 0;
        }
      }
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
  incrementMiniGame,
  addAchievedLetter,
  addCompletionTime,
  addFinishingTime,
  updateAmountCorrect,
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
