import Link from "next/link";
import tiles from "../lib/tiles";
import { Tile } from "../types/types";

interface TileProps {
  square: Tile;
  minWidth: number;
}

function Square({ square, minWidth }: TileProps) {
  const imageUrl = tiles[square.image];
  const rotate = String(square.rotate) || "0";
  const widthSpan = `span ${square.width || 1}`;
  const heightSpan = `span ${square.height || 1}`;

  const isButton = square.button;

  if (!isButton) {
    return (
      <div
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
    );
  }
  return (
    <Link
      href={`/${square.letter}`}
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
}

export default Square;
