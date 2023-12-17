"use client";

import MiniGames from "../../../components/games/MiniGames";
import Navbar from "../../../components/navigation/Navbar";

function Page({ params }: { params: { letter: string } }) {
  return (
    <div className="flex h-full flex-col">
      <Navbar />
      <div className="flex-grow">
        <MiniGames letter={params.letter} />
      </div>
    </div>
  );
}

export default Page;
