"use client";

import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { Tile } from "../../types/types";
import Square from "./Square";

interface GridProps {
  grid: Tile[][];
  setGrid: Dispatch<SetStateAction<Tile[][]>>;
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
}

function Grid({ grid, setGrid, level, setLevel }: GridProps) {
  const rows = grid.length;
  const columns = grid[0].length;

  if (grid.length === 0) {
    return null;
  }

  return (
    <div
      className="grid rounded-full"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {grid.map((row) =>
        row.map((square) => (
          <Square key={uuidv4()} square={square} dimensions={[rows, columns]} />
        )),
      )}
    </div>
  );
}

export default Grid;