import { motion } from "framer-motion";

interface FlyingLetterProps {
  letter: string;
  onLetterClick: (letter: string) => void;
}

function FlyingLetter({ letter, onLetterClick }: FlyingLetterProps) {
  const left = `${Math.random() * 90}%`;
  const top = `${Math.random() * 90}%`;

  const variants = {
    initial: {
      opacity: 0,
      scale: 0.5,
      y: 50,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  console.log(letter);

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={() => onLetterClick(letter)}
      style={{ position: "absolute", left, top }}
    >
      {letter}
    </motion.div>
  );
}

export default FlyingLetter;
