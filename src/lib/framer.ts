import { AnimationDefinition, AnimationProps, Variants } from "framer-motion";

export const wiggle: AnimationDefinition = {
  x: [0, -20, 20, -20, 20, 0],
  y: [0, 20, -20, 20, -20, 0],
  rotate: [0, 10, -10, 10, -10, 0],
  transition: { duration: 2, ease: "easeInOut" },
};

export const flip: AnimationDefinition = {
  rotateY: [0, 180, 0],
  transition: { duration: 2, ease: "easeInOut" },
};

export const resize: AnimationDefinition = {
  scale: [1, 1.2, 1, 1.2, 1],
  transition: { duration: 2, ease: "easeInOut" },
};

export const bounce: Variants = {
  hidden: { y: -50 },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export const scaleUp: AnimationProps["transition"] = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { duration: 0.5 } },
};

export const slideInFromLeft: AnimationProps["transition"] = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 1 } },
};

export const fadeIn: AnimationProps["transition"] = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

export const rotate: AnimationProps["transition"] = {
  hidden: { rotate: 0 },
  visible: { rotate: 360, transition: { duration: 2 } },
};

// export const flip: AnimationProps["transition"] = {
//   hidden: { rotateX: 0 },
//   visible: { rotateX: 360, transition: { duration: 1 } },
// };

export const hoverAnimation: AnimationProps["transition"] = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
};
