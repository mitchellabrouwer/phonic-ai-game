"use client";

import Navbar from "../navigation/Navbar";
import LandGrid from "./LandGrid";

export default function Dashboard() {
  return (
    <div className="flex h-full flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <LandGrid />
      </div>
    </div>
  );
}
