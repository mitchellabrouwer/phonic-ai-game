import tiles from "../lib/imagePaths/tiles";

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
