import Link from "next/link";
import tiles from "../../lib/tiles";
import { Tile } from "../../types/types";

interface TileProps {
  square: Tile;
}

function Square({ square }: TileProps) {
  // const orientation = useOrientation();

  const imageUrl = tiles[square.image];
  console.log(square.rotate);

  const rotationDegrees = String(square.rotate) ?? "0";
  const gridColumnSpan = `span ${square.width ?? 1}`;
  const gridRowSpan = `span ${square.height ?? 1}`;

  // const minSize = (divisor: number) =>
  //   `${Math.floor(GAME_SPACE_PERCENT / divisor)}${
  //     orientation === "landscape" ? "vh" : "vw"
  //   }`;

  // const size = orientation === "landscape" ? minSize(rows) : minSize(columns);

  // const sizes = {
  //   xs: "10vw",
  //   sm: ""
  //   md:
  //   lg:
  // }

  const styles = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    gridColumnEnd: gridColumnSpan,
    gridRowEnd: gridRowSpan,
    transform: `rotate(${rotationDegrees}deg)`,
    minWidth: "10vw",
    minHeight: "10vw",
  };

  return square.button ? (
    <Link href={`/${square.letter}`} style={styles} />
  ) : (
    <div style={styles} />
  );
}

export default Square;
