import Link from "next/link";
import { useOrientation } from "../../context/OrientationProvider";
import { GAME_SPACE_PERCENT } from "../../lib/constants";
import tiles from "../../lib/tiles";
import { Tile } from "../../types/types";

interface TileProps {
  square: Tile;
  dimensions: [number, number];
}

function Square({ square, dimensions }: TileProps) {
  const orientation = useOrientation();
  const [rows, columns] = dimensions;
  const imageUrl = tiles[square.image];
  const rotationDegrees = String(square.rotate) ?? "0";
  const gridColumnSpan = `span ${square.width ?? 1}`;
  const gridRowSpan = `span ${square.height ?? 1}`;

  const minSize = (divisor: number) =>
    `${Math.floor(GAME_SPACE_PERCENT / divisor)}${
      orientation === "landscape" ? "vh" : "vw"
    }`;

  const size = orientation === "landscape" ? minSize(rows) : minSize(columns);

  const styles = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    gridColumnEnd: gridColumnSpan,
    gridRowEnd: gridRowSpan,
    transform: `rotate(${rotationDegrees}deg)`,
    minWidth: size,
    minHeight: size,
  };

  return square.button ? (
    <Link href={`/${square.letter}`} style={styles} />
  ) : (
    <div style={styles} />
  );
}

export default Square;
