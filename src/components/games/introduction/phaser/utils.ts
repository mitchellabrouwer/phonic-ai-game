import levels from "../../../../levels/levels";
import { DifficultyLevel } from "../../../../types/types";
import {
  Breakpoint,
  breakpoint,
  difficultyLetterCountMap,
} from "./gameConstants";

function getLandLetters(land: number) {
  const landLevels = levels[land];
  if (!landLevels) return [];
  return landLevels.map((level) => level.letter);
}

function getLettersForDifficulty(
  land: number,
  difficulty: DifficultyLevel,
  letter: string,
): string[] {
  const allLandLetters = getLandLetters(land);
  const extraLetterCount = difficultyLetterCountMap[difficulty];

  const letters = [letter];

  for (
    let i = 0;
    letters.length - 1 < extraLetterCount && i < allLandLetters.length;
    i += 1
  ) {
    if (allLandLetters[i] !== letter) {
      letters.push(allLandLetters[i]);
    }
  }

  return letters;
}

function getRepeatedLetters(letters: string[], repeatFactor: number): string[] {
  return letters.flatMap((letter) => Array(repeatFactor).fill(letter));
}

function getScreenBreakpoint(width: number): Breakpoint {
  if (width < breakpoint.sm) {
    return "sm";
  }
  if (width >= breakpoint.sm && width < breakpoint.md) {
    return "md";
  }
  if (width >= breakpoint.md && width < breakpoint.lg) {
    return "lg";
  }
  return "lg";
}

export {
  getLandLetters,
  getLettersForDifficulty,
  getRepeatedLetters,
  getScreenBreakpoint
};

