import { TileName } from "../types/types";
import Tile from "./Tile";

interface GridProps {
  gridData: TileName[][];
}

function Grid({ gridData }: GridProps) {
  return (
    <div className="grid grid-cols-6">
      {gridData.map((row, rowIndex) =>
        row.map((tileType, tileIndex) => (
          <Tile key={rowIndex + tileIndex} type={tileType} />
        )),
      )}
    </div>
  );
}

export default Grid;
