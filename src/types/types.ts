import { DIFFICULTY_LEVELS } from "../lib/constants";
import tiles from "../lib/paths/mapPieces";

export type Orientation = "landscape" | "portrait";

export type TileName = keyof typeof tiles;

export type GameVariables = {
  lives: number;
  difficulty: DifficultyLevel;
  land: number;
  letter: string;
};

export type Tile = {
  image: TileName;
  rotate?: number;
  width?: number;
  height?: number;
  letter?: string;
  character?: string;
  bg?: TileName;
  button?: boolean;
};

export type Level = {
  letter: string;
  character: string;
  image: TileName;
  bg: TileName;
};

export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number];
