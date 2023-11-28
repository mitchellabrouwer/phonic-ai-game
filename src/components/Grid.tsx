"use client";

import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { Tile } from "../types/types";
import Square from "./Square";

interface GridProps {
  map: Tile[][];
  setMap: Dispatch<SetStateAction<Tile[][]>>;
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
  isLandscape: boolean;
}

function Grid({ map, setMap, level, setLevel, isLandscape }: GridProps) {
  const rows = map.length;
  const columns = map[0].length;
  const minWidth = Math.floor(100 / columns);

  if (map.length === 0) {
    return null;
  }

  return (
    <div
      className="grid rounded-lg"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {map.map((row) =>
        row.map((square) => (
          <Square key={uuidv4()} square={square} minWidth={minWidth} />
        )),
      )}
    </div>
  );
}

export default Grid;
