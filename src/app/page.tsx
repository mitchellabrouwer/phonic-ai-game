"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Grid from "../components/Grid";
import useOrientation from "../hooks/useOrientation";
import { levelOneLand, levelOnePort } from "../levels/levelOne";
import { Tile } from "../types/types";

export default function Home() {
  const [level, setLevel] = useState(1);
  const isLandscape = useOrientation();

  // check local storage
  const [grid, setGrid] = useState<Tile[][]>([]);
  // console.log(levelOnePort());

  useEffect(() => {
    if (level === 1) {
      setGrid(isLandscape ? levelOneLand() : levelOnePort());
    }
  }, [isLandscape, level]);

  // console.log(grid);

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
        <Grid
          grid={grid}
          setGrid={setGrid}
          level={level}
          setLevel={setLevel}
          isLandscape={isLandscape}
        />
      )}
    </main>
  );
}
