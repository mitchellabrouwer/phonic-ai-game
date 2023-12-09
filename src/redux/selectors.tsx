import { RootState } from "./store";

export const getLandIndex = (state: RootState) => state.game.land;

export const getShowInstructions = (state: RootState) =>
  state.instructions.isVisible;

export const getCompletedLetters = (state: RootState) =>
  state.game.completedLetters;

export const getLetterIndex = (state: RootState) => state.game.letter;

export const getDifficulty = (state: RootState) => state.game.difficulty;
