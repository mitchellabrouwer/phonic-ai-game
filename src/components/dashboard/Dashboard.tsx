"use client";

import Image from "next/image";
import { useState } from "react";
import LevelGrid from "./LevelGrid";

export default function Dashboard() {
  const [level, setLevel] = useState("1");

  return (
    <div className="mt-20 flex justify-center">
      <div className="absolute left-1/2 top-1/2 z-20 h-[10vw] w-[10vw] -translate-x-1/2 -translate-y-1/2 transform">
        <Image
          src="/assets/artwork/alphabet_wonderland_3.png"
          width={250}
          height={250}
          alt="Alphabet Wonderland logo"
        />
      </div>
      <LevelGrid level={level} setLevel={setLevel} />
    </div>
  );
}
