import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import tiles from "../lib/tiles";
import { Tile } from "../types/types";

interface GridProps {
  gridData: Tile[][];
}

function Grid({ gridData }: GridProps) {
  const columns = gridData[0].length;
  return (
    <div
      className="grid border-4 rounded-lg border-white"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {gridData.map((row) =>
        row.map((tile) => {
          const imageUrl = tiles[tile.image];
          const widthSpan = `span ${tile.width || 1}`;
          const heightSpan = `span ${tile.height || 1}`;
          const rotate = String(tile.rotate) || "0";
          const isButton = tile.button;

          const renderedTile = !isButton ? (
            <div
              key={uuidv4()}
              className="min-w-[4vw] min-h-[4vw] md:min-w-[5vw] md:min-h-[5vw]"
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
          ) : (
            <Link
              href={`/${tile.letter}`}
              key={uuidv4()}
              className="min-w-[4vw] min-h-[4vw] md:min-w-[5vw] md:min-h-[5vw]"
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
