import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import buildAttraction from "../../levels/attractionBuilder";
import { Tile } from "../../types/types";
import Square from "./Square";

interface AttractionGridProps {
  land: string;
  setLand: Dispatch<SetStateAction<string>>;
  attraction: Tile;
}

function AttractionGrid({ land, setLand, attraction }: AttractionGridProps) {
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
