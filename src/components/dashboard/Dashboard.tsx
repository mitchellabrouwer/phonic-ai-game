"use client";

import { useState } from "react";
import Navbar from "../navigation/Navbar";
import LevelGrid from "./LandGrid";

export default function Dashboard() {
  const [land, setLand] = useState("1");

  return (
    <div className="">
      <Navbar />
      <LevelGrid land={land} setLand={setLand} />
    </div>
  );
}
