import Image from "next/image";
import React from "react";
import characters from "../../lib/paths/characters";
import { useAppSelector } from "../../lib/redux";
import { getShowInstructions } from "../../redux/selectors";

interface InstructionProps {
  onPlay: () => void;
  title: string;
  introduction: string;
  howToPlay: string;
  letter: string;
}

function Instructions({
  onPlay,
  title,
  introduction,
  howToPlay,
  letter,
}: InstructionProps) {
  const isVisible = useAppSelector(getShowInstructions);
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onPlay();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex h-full items-start justify-center bg-white bg-opacity-75 p-4">
      <div className="rounded-lg bg-gray-100 p-5 text-center shadow-lg">
        <h2 className="mb-3 text-2xl font-bold text-gray-800">{title}</h2>
        <p className="mx-auto my-4 max-w-3xl text-center text-lg text-gray-700">
          {introduction}
        </p>
        <div className="flex w-full justify-center">
          <div className="w-36 sm:w-48 md:w-64 lg:w-72 xl:w-96">
            <Image
              // className="h-auto w-36"
              layout="responsive"
              src={characters[letter]}
              alt={`Letter ${letter}`}
              width={100}
              height={100}
            />
          </div>
        </div>
        <h2 className="mb-3 text-2xl font-bold text-gray-800">How to play?</h2>
        <h3 className="mx-auto my-4 max-w-3xl text-lg text-gray-600">
          {howToPlay}
        </h3>
        <button
          type="button"
          onClick={onPlay}
          onKeyDown={handleKeyPress}
          className="transform rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 px-6 py-3 text-xl font-bold text-white shadow-lg transition duration-150 ease-in-out hover:scale-105 hover:from-pink-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          tabIndex={0}
        >
          Start Game 🌟
        </button>
      </div>
    </div>
  );
}

export default Instructions;
