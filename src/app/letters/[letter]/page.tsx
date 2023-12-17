"use client";

import Games from "../../../components/games/MiniGames";
import Navbar from "../../../components/navigation/Navbar";

function Page({ params }: { params: { letter: string } }) {
  return (
    <div>
      <Navbar />
      <div className="mt-16">
        <Games letter={params.letter} />
      </div>
    </div>
  );
}

export default Page;
