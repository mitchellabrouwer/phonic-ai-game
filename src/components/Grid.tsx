import { v4 as uuidv4 } from "uuid";
import { TileName } from "../types/types";
import Tile from "./Tile";

interface GridProps {
  gridData: TileName[][];
}

function Grid({ gridData }: GridProps) {
  return (
    <div className="grid grid-cols-6">
      {gridData.map((row) =>
        row.map((tileType) => <Tile key={uuidv4()} type={tileType} />),
      )}
    </div>
  );
}

export default Grid;
