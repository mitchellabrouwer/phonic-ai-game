/* eslint-disable no-await-in-loop */

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { bounce } from "../../lib/framer";
import characters from "../../lib/paths/characters";
import { useAppDispatch, useAppSelector } from "../../lib/redux";
import { hideInstructions } from "../../redux/instructions/instructionsSlice";
import { getShowInstructions } from "../../redux/selectors";

interface InstructionProps {
  title: string;
  introduction: string;
  howToPlay: string;
  letter: string;
}

function Instructions({
  title,
  introduction,
  howToPlay,
  letter,
}: InstructionProps) {
  const isVisible = useAppSelector(getShowInstructions);
  const controls = useAnimation();
  // const sound = useRef<Howl | null>(null);
  const dispatch = useAppDispatch();

  const onPlay = () => {
    dispatch(hideInstructions());
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      onPlay();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    controls.start("visible");
    return () => {
      controls.stop();
    };
  }, [controls]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex h-full items-start justify-center bg-white bg-opacity-75 p-4">
      <div className="rounded-lg bg-gray-100 p-5 text-center shadow-lg">
        <h2 className="mb-3 text-xl font-bold text-gray-800 sm:text-2xl md:text-3xl">
          {title}
        </h2>
        <p className="mx-auto my-1 max-w-3xl text-center text-sm text-gray-700 sm:text-base md:text-lg">
          {introduction}
        </p>

        <div className="flex w-full justify-center">
          <motion.div initial="hidden" animate={controls} variants={bounce}>
            <div className="w-20 sm:w-48 md:w-64 lg:w-72 xl:w-96">
              <Image
                className="h-auto w-full"
                src={characters[letter]}
                alt={`Letter ${letter}`}
                width={100}
                height={100}
              />
            </div>
          </motion.div>
        </div>
        <h2 className="mb-3 text-xl font-bold text-gray-800 sm:text-2xl md:text-3xl">
          How to play?
        </h2>
        <h3 className="mx-auto my-1 max-w-3xl text-sm text-gray-600 sm:text-base md:text-lg">
          {howToPlay}
        </h3>

        <button
          type="button"
          onClick={onPlay}
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
