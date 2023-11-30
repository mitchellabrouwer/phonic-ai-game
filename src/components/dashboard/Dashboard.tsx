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
    <div className="flex justify-center">
      <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 transform">
        <Image
          className="-mt-5"
          src="/assets/artwork/alphabet_wonderland.png"
          width={250}
          height={250}
          // layout="responsive"
          alt="Alphabet Wonderland logo"
        />
      </div>
      {grid.length > 0 && (
        <Grid grid={grid} setGrid={setGrid} level={level} setLevel={setLevel} />
      )}
    </div>
  );
}
