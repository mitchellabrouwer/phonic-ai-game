import { RootState } from "./store";

export const getLives = (state: RootState) => state.game.lives;
export const getLandIndex = (state: RootState) => state.game.land;
export const getLetterIndex = (state: RootState) => state.game.letter;
export const getDifficulty = (state: RootState) => state.game.difficulty;

export const getShowInstructions = (state: RootState) =>
  state.instructions.isVisible;

export const getCompletedLetters = (state: RootState) =>
  state.game.completedLetters;
