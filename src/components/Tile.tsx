import tiles from "../lib/tiles";
import { TileInfo } from "../types/types";

interface TileProps {
  tile: TileInfo;
}

function Tile({ tile }: TileProps) {
  const imageUrl = tiles[tile.name];
  const widthSpan = `span ${tile.width || 1}`;
  const heightSpan = `span ${tile.height || 1}`;

  return (
    <div
      className="w-12 h-12"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        gridColumnEnd: widthSpan,
        gridRowEnd: heightSpan,
        border: "1px solid",
      }}
    >
      t
    </div>
  );
}

export default Tile;
