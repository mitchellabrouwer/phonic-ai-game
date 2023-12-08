import React from "react";
import { useAppSelector } from "../../lib/redux";
import { getShowInstructions } from "../../redux/selectors";
import Background from "../background/Background";

interface InstructionProps {
  onPlay: () => void;
  instructions: string;
  gameTitle: string;
  letter: string;
}

function Instructions({
  onPlay,
  instructions,
  gameTitle,
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
    <Background src="/assets/background/Land_2.png">
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 p-4">
        <div className="rounded-lg bg-gray-100 p-5 text-center shadow-lg">
          <h2 className="mb-3 text-2xl font-bold text-gray-800">{gameTitle}</h2>
          <h3 className="mb-2 text-xl text-gray-600">
            Learning about: {letter}
          </h3>
          <p className="mb-4 text-lg text-gray-700">{instructions}</p>
          <button
            type="button"
            onClick={onPlay}
            onKeyDown={handleKeyPress}
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            tabIndex={0}
          >
            Start Game
          </button>
        </div>
      </div>
    </Background>
  );
}

export default Instructions;
