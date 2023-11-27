"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Grid from "../components/Grid";
import levelOne from "../levels/levelOne";
import { Tile } from "../types/types";

export default function Home() {
  const [level, setLevel] = useState(1);
  const [map, setMap] = useState<Tile[][]>([]);

  useEffect(() => {
    if (level === 1) {
      setMap(levelOne);
    }
  }, [level]);

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
      {map.length > 0 && (
        <Grid map={map} setMap={setMap} level={level} setLevel={setLevel} />
      )}
    </main>
  );
}
