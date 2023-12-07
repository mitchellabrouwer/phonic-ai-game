"use client";

import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import levels from "../../levels/levels";
import { RootState } from "../../redux/store";
import AttractionGrid from "./AttractionGrid";

const getLandIndex = (state: RootState) => state.game.land;

function LandGrid() {
  const landIndex = useSelector(getLandIndex);
  const landMap = levels[landIndex];

  return (
    <div className="rounded-3xl border-4 border-gray-700 bg-gray-600 p-2 shadow-lg">
      <div className="grid grid-cols-2 overflow-hidden rounded-lg md:grid-cols-3 lg:grid-cols-4">
        {landMap.map((attraction) => (
          <AttractionGrid key={uuidv4()} attraction={attraction} />
        ))}
      </div>
    </div>
  );
}

export default LandGrid;
