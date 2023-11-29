"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useOrientation } from "../../context/OrientationProvider";
import { levelOneLand, levelOnePort } from "../../levels/levelOne";
import { Tile } from "../../types/types";
import Grid from "./Grid";

export default function Dashboard() {
  const [level, setLevel] = useState(1);
  const orientation = useOrientation();

  // TODO: check local storage
  const [grid, setGrid] = useState<Tile[][]>([]);

  useEffect(() => {
    if (level === 1) {
      setGrid(orientation === "landscape" ? levelOneLand() : levelOnePort());
    }
    // TODO: add other levels here
  }, [level, orientation]);

  console.log(grid);

  return (
    <main className="flex justify-center">
      <div className="max-w-sm relative z-20">
        <Image
          className="absolute top-0 w-5 h-5"
          src="/assets/artwork/alphabet_wonderland.png"
          width={250}
          height={250}
          layout="responsive"
          alt="Alphabet Wonderland logo"
        />
      </div>
      {/* <SimpleGrid /> */}
      {grid.length > 0 && (
        <Grid grid={grid} setGrid={setGrid} level={level} setLevel={setLevel} />
      )}
    </main>
  );
}
