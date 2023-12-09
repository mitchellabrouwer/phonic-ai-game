/* eslint-disable no-await-in-loop */
import { motion, useAnimation } from "framer-motion";
import { Howl } from "howler";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { flip, resize, wiggle } from "../../lib/framer";
import backgrounds from "../../lib/imagePaths/backgrounds";
import { useAppDispatch, useAppSelector } from "../../lib/redux";
import {
  displayInstructions,
  hideInstructions,
} from "../../redux/instructions/instructionsSlice";
import { getShowInstructions } from "../../redux/selectors";
import Background from "../background/Background";
import Instructions from "./Instructions";

interface IntroductionProps {
  letter: string;
}

function Introduction({ letter }: IntroductionProps) {
  const controls = useAnimation();
  const sound = useRef<Howl | null>(null);

  const showInstructions = useAppSelector(getShowInstructions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(displayInstructions());

    return () => {
      dispatch(hideInstructions());
    };
  }, [dispatch]);

  useEffect(() => {
    sound.current = new Howl({
      src: ["/assets/audio/piano.mp3"],
      html5: true,
      onplay: () => {
        if (sound.current) {
          const sequenceDurationMs = sound.current.duration() * 1000;
          const startTime = Date.now();
          const sequence = async () => {
            while (Date.now() - startTime < sequenceDurationMs) {
              await controls.start(wiggle);
              await controls.start(flip);
              await controls.start(resize);
            }
          };
          sequence();
        }
      },
    });

    return () => {
      sound.current?.stop();
    };
  }, [controls]);

  const handleStartGame = () => {
    dispatch(hideInstructions());
    if (sound.current) {
      sound.current.play();
    }
  };

  return (
    <Background src={backgrounds.sky}>
      <div className="h-screen w-screen">
        {showInstructions && (
          <Instructions
            gameTitle="Meet sammy"
            onPlay={handleStartGame}
            letter={letter}
            instructions="Here are the instructions for the game. Click start when you're ready."
          />
        )}

        <motion.div
          animate={controls}
          className="flex h-full items-center justify-center"
        >
          <Image
            src="/assets/characters/sammy/sammy.png"
            width={250}
            height={250}
            alt="Alphabet Wonderland logo"
          />
        </motion.div>
      </div>
    </Background>
  );
}

export default Introduction;
