import tiles from "../lib/paths/mapPieces";

export type Orientation = "landscape" | "portrait";

export type TileName = keyof typeof tiles;

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
