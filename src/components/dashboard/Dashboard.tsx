"use client";

import { useState } from "react";
import Navbar from "../navigation/Navbar";
import LandGrid from "./LandGrid";

export default function Dashboard() {
  const [land, setLand] = useState("1");

  return (
    <div className="flex h-full flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <LandGrid land={land} setLand={setLand} />
      </div>
    </div>
  );
}
