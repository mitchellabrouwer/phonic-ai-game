/* eslint-disable no-await-in-loop */
import { motion, useAnimation } from "framer-motion";
import { Howl } from "howler";
import Image from "next/image";
import { flip, resize, wiggle } from "../../lib/framer";
import { useAppDispatch, useAppSelector } from "../../lib/redux";
import { toggleVisibility } from "../../redux/instructions/instructionsSlice";
import { getShowInstructions } from "../../redux/selectors";
import Instructions from "./Instructions";

interface IntroductionProps {
  letter: string;
}

function Introduction({ letter }: IntroductionProps) {
  const controls = useAnimation();

  const showInstructions = useAppSelector(getShowInstructions);
  const dispatch = useAppDispatch();

  const sound = new Howl({
    src: ["/assets/audio/piano.mp3"],
    html5: true,
    onplay: () => {
      const sequenceDurationMs = sound.duration() * 1000;
      const startTime = Date.now();
      const sequence = async () => {
        while (Date.now() - startTime < sequenceDurationMs) {
          await controls.start(wiggle);
          await controls.start(flip);
          await controls.start(resize);
        }
      };
      sequence();
    },
  });

  const handleStartGame = () => {
    dispatch(toggleVisibility());
    sound.play();
  };

  return (
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
  );
}

export default Introduction;
