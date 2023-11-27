import { Tile } from "../types/types";

function transposeTiles(grid: Tile[][]) {
  return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
}

export default transposeTiles;
