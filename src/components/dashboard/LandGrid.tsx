"use client";

import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import levels from "../../levels/levels";
import AttractionGrid from "./AttractionGrid";

interface LevelGridProps {
  land: string;
  setLand: Dispatch<SetStateAction<string>>;
}

function LandGrid({ land, setLand }: LevelGridProps) {
  const landMap = levels[land];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {landMap.map((attraction) => (
        <AttractionGrid
          key={uuidv4()}
          land={land}
          setLand={setLand}
          attraction={attraction}
        />
      ))}
    </div>
  );
}

export default LandGrid;
