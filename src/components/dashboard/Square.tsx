import Link from "next/link";
import { GAME_SPACE_PERCENT } from "../../lib/constants";
import tiles from "../../lib/tiles";
import { Tile } from "../../types/types";

interface TileProps {
  square: Tile;
  dimensions: [number, number];
  isLandscape: boolean | null;
}

function Square({ square, dimensions, isLandscape }: TileProps) {
  const [rows, columns] = dimensions;

  const imageUrl = tiles[square.image];
  const rotate = String(square.rotate) || "0";

  const widthSpan = `span ${square.width || 1}`;
  const heightSpan = `span ${square.height || 1}`;

  const landscapeMinWidth = Math.floor(GAME_SPACE_PERCENT / rows);
  const portraitMinWidth = Math.floor(GAME_SPACE_PERCENT / columns);

  const isButton = square.button;

  const size = isLandscape ? `${landscapeMinWidth}vh` : `${portraitMinWidth}vw`;

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
          minWidth: size,
          minHeight: size,
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
