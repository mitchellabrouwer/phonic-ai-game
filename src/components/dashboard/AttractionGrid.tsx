import { Dispatch, SetStateAction } from "react";
import buildAttraction from "../../levels/attractionBuilder";
import { Tile } from "../../types/types";
import Square from "./Square";

interface AttractionGridProps {
  level: string;
  setLevel: Dispatch<SetStateAction<string>>;
  attraction: Tile;
}

function AttractionGrid({ level, setLevel, attraction }: AttractionGridProps) {
  const grid = buildAttraction(attraction);
  return (
    <div className="grid grid-cols-5">
      {grid.map((item, index) => (
        <Square key={index} square={item} />
      ))}
    </div>
  );
}

export default AttractionGrid;
