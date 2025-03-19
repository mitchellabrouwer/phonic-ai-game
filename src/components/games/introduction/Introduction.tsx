import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import miniGameData from "../../../levels/miniGameData";
import { useAppDispatch, useAppSelector } from "../../../lib/redux";
import {
  displayInstructions,
  hideInstructions,
} from "../../../redux/instructions/instructionsSlice";
import { getShowInstructions } from "../../../redux/selectors";
import Instructions from "../Instructions";

function LoadingScreen() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-blue-100 to-purple-100">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-4 text-6xl"
        >
          🎮
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-purple-600"
        >
          Loading Fun...
        </motion.h2>
        <motion.div
          className="mt-4 flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-3 w-3 rounded-full bg-purple-500"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

const DynamicFlyingLetters = dynamic(() => import("./FlyingLetterPhaser"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

interface IntroductionProps {
  letter: string;
}

function Introduction({ letter }: IntroductionProps) {
  const showInstructions = useAppSelector(getShowInstructions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(displayInstructions());

    return () => {
      dispatch(hideInstructions());
    };
  }, [dispatch]);

  if (showInstructions) {
    return (
      <Instructions
        letter={letter}
        title={miniGameData[letter].title}
        introduction={miniGameData[letter].introduction}
        howToPlay={miniGameData[letter].howToPlay}
      />
    );
  }

  return (
    <div className="h-full w-full">
      <DynamicFlyingLetters letter={letter} />
    </div>
  );
}

export default Introduction;
