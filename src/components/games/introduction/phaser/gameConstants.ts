import { DifficultyLevel } from "../../../../types/types";

export type Breakpoint = keyof typeof breakpoint;
export type Offset = {
  [K in Breakpoint]: { x: number; y: number };
};
type Scaling = {
  [K in Breakpoint]: number;
};

export const greenSlashAnimLength = 10;
export const redSlashAnimLength = 8;

export const breakpoint = {
  sm: 640,
  md: 768,
  lg: 1024,
};

export const scaling: Scaling = {
  sm: 0.5,
  md: 0.75,
  lg: 1,
};

export const difficultyLetterCountMap: Record<DifficultyLevel, number> = {
  easy: 1, // 1 extra letter
  medium: 2, // 2 extra letters
  hard: 3, // 3 extra letters
  extra: 4, // 4 extra letters
  master: 5, // 5 extra letters
};

export const letterOffsets: Offset = {
  sm: { x: -20, y: -50 },
  md: { x: -30, y: -75 },
  lg: { x: -40, y: -100 },
};
