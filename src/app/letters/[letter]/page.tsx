"use client";

import Navbar from "../../../components/navigation/Navbar";

function Page({ params }: { params: { letter: string } }) {
  // need to list the games in each

  return (
    <div>
      <Navbar />
      <div>My Letter is: {params.letter}</div>
    </div>
  );
}

export default Page;
