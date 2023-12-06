"use client";

import Games from "../../../components/games/MiniGames";
import Navbar from "../../../components/navigation/Navbar";

function Page({ params }: { params: { letter: string } }) {
  return (
    <div>
      <Navbar />
      <Games letter={params.letter} />
    </div>
  );
}

export default Page;
