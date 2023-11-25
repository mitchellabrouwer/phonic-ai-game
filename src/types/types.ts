import tiles from "../lib/tiles";

export type TileName = keyof typeof tiles;

export type Tile = {
  image: TileName;
  rotate?: number;
  width?: number;
  height?: number;
  letter?: string;
  character?: string;
  button?: boolean;
};
