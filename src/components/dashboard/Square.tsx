import Link from "next/link";
import tiles from "../../lib/tiles";
import { Tile } from "../../types/types";

interface TileProps {
  square: Tile;
}

function Square({ square }: TileProps) {
  const imageUrl = tiles[square.image];
  const rotationDegrees = String(square.rotate) ?? "0";
  const gridColumnSpan = `span ${square.width ?? 1}`;
  const gridRowSpan = `span ${square.height ?? 1}`;

  const commonStyles = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    gridColumnEnd: gridColumnSpan,
    gridRowEnd: gridRowSpan,
    transform: `rotate(${rotationDegrees}deg)`,
  };

  return square.button ? (
    <Link
      href={`/${square.letter}`}
      style={commonStyles}
      className="flex min-h-[10vw] min-w-[10vw] items-center justify-center md:min-h-[6.5vw] md:min-w-[6.5vw] lg:min-h-[5vw] lg:min-w-[5vw]"
    >
      <span className="text-9xl">{square.letter}</span>
    </Link>
  ) : (
    <div
      style={commonStyles}
      className="min-h-[10vw] min-w-[10vw] md:min-h-[6.5vw] md:min-w-[6.5vw] lg:min-h-[5vw] lg:min-w-[5vw] "
    />
  );
}

export default Square;
