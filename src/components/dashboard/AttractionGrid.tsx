import { v4 as uuidv4 } from "uuid";
import buildAttraction from "../../levels/attractionBuilder";
import { Tile } from "../../types/types";
import Square from "./Square";

interface AttractionGridProps {
  attraction: Tile;
}

function AttractionGrid({ attraction }: AttractionGridProps) {
  const grid = buildAttraction(attraction);

  return (
    <div className="grid grid-cols-5">
      {grid.map((item) => (
        <Square key={uuidv4()} square={item} />
      ))}
    </div>
  );
}

export default AttractionGrid;
