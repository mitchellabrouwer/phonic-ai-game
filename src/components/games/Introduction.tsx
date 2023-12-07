/* eslint-disable no-await-in-loop */
import { motion, useAnimation } from "framer-motion";
import { Howl } from "howler";
import Image from "next/image";

interface IntroductionProps {}

function Introduction({}: IntroductionProps) {
  const controls = useAnimation();

  // Define animations
  const wiggle = {
    x: [0, -20, 20, -20, 20, 0],
    y: [0, 20, -20, 20, -20, 0],
    rotate: [0, 10, -10, 10, -10, 0],
    transition: { duration: 2, ease: "easeInOut" },
  };

  const flip = {
    rotateY: [0, 180, 0],
    transition: { duration: 2, ease: "easeInOut" },
  };

  const resize = {
    scale: [1, 1.2, 1, 1.2, 1],
    transition: { duration: 2, ease: "easeInOut" },
  };

  const sound = new Howl({
    src: ["/assets/audio/piano.mp3"],
    html5: true,
    onplay: () => {
      console.log("play");

      // Synchronize animation with the sound duration
      const sequenceDuration = sound.duration() * 1000; // Duration in milliseconds
      const startTime = Date.now();
      const sequence = async () => {
        while (Date.now() - startTime < sequenceDuration) {
          await controls.start(wiggle);
          await controls.start(flip);
          await controls.start(resize);
        }
      };
      sequence();
    },
  });

  // useEffect(() => {
  //   sound.play();

  //   return () => {
  //     sound.stop();
  //     controls.stop();
  //   };
  // }, [sound, controls]);

  return (
    <div className="h-screen w-screen">
      {/* need an instruction screen then click button */}
      <button type="button" onClick={() => sound.play()}>
        Play
      </button>

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
