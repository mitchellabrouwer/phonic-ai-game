import tiles from "../lib/tiles";
import { TileName } from "../types/types";

interface TileProps {
  type: TileName;
}

function Tile({ type }: TileProps) {
  const imageUrl = tiles[type];
  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className="w-24 h-24 bg-cover bg-center"
    />
  );
}

export default Tile;
