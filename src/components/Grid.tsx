"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import useOrientation from "../hooks/useOrientation";
import tiles from "../lib/tiles";
import { Tile } from "../types/types";
import transposeTiles from "../utils/transpose";

interface GridProps {
  map: Tile[][];
  setMap: Dispatch<SetStateAction<Tile[][]>>;
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
}

function Grid({ map, setMap, level, setLevel }: GridProps) {
  const isLandscape = useOrientation();

  console.log(map);
  console.log(transposeTiles(map));

  return (
    <div
      className="grid rounded-lg"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {map.map((row) =>
        row.map((tile) => {
          const imageUrl = tiles[tile.image];
          const widthSpan = `span ${tile.width || 1}`;
          const heightSpan = `span ${tile.height || 1}`;
          const rotate = String(tile.rotate) || "0";
          const isButton = tile.button;

          const minWidth = Math.floor(100 / columns);

          const renderedTile = !isButton ? (
            <div
              key={uuidv4()}
              // className="min-w-[4vw] min-h-[4vw]"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                gridColumnEnd: widthSpan,
                gridRowEnd: heightSpan,
                transform: `rotate(${rotate}deg)`,

                minWidth: `${minWidth}vw`,
                minHeight: `${minWidth}vw`,
              }}
            />
          ) : (
            <Link
              href={`/${tile.letter}`}
              key={uuidv4()}
              // className="min-w-[4vw] min-h-[4vw] md:min-w-[5vw] md:min-h-[5vw]"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                gridColumnEnd: widthSpan,
                gridRowEnd: heightSpan,
                transform: `rotate(${rotate}deg)`,
              }}
            />
          );

          return renderedTile;
        }),
      )}
    </div>
  );
}

export default Grid;
