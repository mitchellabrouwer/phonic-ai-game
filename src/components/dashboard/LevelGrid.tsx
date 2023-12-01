"use client";

import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { useOrientation } from "../../context/OrientationProvider";
import levels from "../../levels/levels";
import AttractionGrid from "./AttractionGrid";

interface LevelGridProps {
  level: string;
  setLevel: Dispatch<SetStateAction<string>>;
}

function LevelGrid({ level, setLevel }: LevelGridProps) {
  const levelMap = levels[level];

  const orientation = useOrientation();
  return (
    <div
      className="grid grid-cols-2 rounded-full md:grid-cols-3 lg:grid-cols-4"
      // style={{
      //   gridTemplateColumns: `repeat(${
      //     orientation === "portrait" ? 2 : 4
      //   }, 1fr)`,
      // }}
    >
      {levelMap.map((attraction) => (
        <AttractionGrid
          key={uuidv4()}
          level={level}
          setLevel={setLevel}
          attraction={attraction}
        />
      ))}
    </div>
  );
}

export default LevelGrid;
