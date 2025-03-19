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
    <div className="flex h-full items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="relative max-w-2xl rounded-2xl bg-white p-8 text-center shadow-2xl ring-4 ring-purple-200">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
          <div className="rounded-full bg-yellow-400 p-2 shadow-lg">
            <span className="text-2xl">🎮</span>
          </div>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-purple-600 sm:text-4xl md:text-5xl">
          {title}
        </h2>

        <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-700 sm:text-xl">
          {introduction}
        </p>

        <div className="flex w-full justify-center">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={bounce}
            className="transform transition-transform hover:scale-105"
          >
            <div className="w-32 sm:w-48 md:w-64 lg:w-72 xl:w-96">
              <Image
                className="h-auto w-full drop-shadow-xl"
                src={characters[letter]}
                alt={`Letter ${letter}`}
                width={100}
                height={100}
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-8 rounded-xl bg-purple-50 p-6">
          <h2 className="mb-3 text-2xl font-bold text-purple-600 sm:text-3xl">
            How to play? 🎯
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-700">{howToPlay}</p>
        </div>

        <button
          type="button"
          onClick={onPlay}
          className="mt-8 transform rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-8 py-4 text-2xl font-bold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          tabIndex={0}
        >
          Start Game 🚀
        </button>
      </div>
    </div>
  );
}

export default Instructions;
