"use client";

import { useState } from "react";
import Navbar from "../navigation/Navbar";
import LandGrid from "./LandGrid";

export default function Dashboard() {
  const [land, setLand] = useState("1");
  const [achievedLandLetters, setLandLetters] = useState([]);
  const [currentLetter, setCurrentLetter] = useState("s");
  const [timeToComplete, setTimeToComplete] = useState();
  const [lives, setLives] = useState();
  const [amountCorrect, setAmountCorrect] = useState();
  const [difficult, setDifficult] = useState<"easy" | "medium" | "hard">(
    "easy",
  );

  return (
    <div className="flex h-full flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <LandGrid land={land} setLand={setLand} />
      </div>
    </div>
  );
}
