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
    <div className="rounded-3xl border-4 border-gray-700 bg-gray-600 p-2 shadow-lg">
      <div className="grid grid-cols-2 overflow-hidden rounded-lg md:grid-cols-3 lg:grid-cols-4">
        {landMap.map((attraction) => (
          <AttractionGrid
            key={uuidv4()}
            land={land}
            setLand={setLand}
            attraction={attraction}
          />
        ))}
      </div>
    </div>
  );
}

export default LandGrid;
