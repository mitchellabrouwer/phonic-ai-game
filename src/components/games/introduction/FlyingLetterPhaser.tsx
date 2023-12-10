import Phaser from "phaser";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../lib/redux";
import { getDifficulty } from "../../../redux/selectors";
import gameDataService from "./GameDataService";
import MainScene from "./MainScene";
import Preloader from "./Preloader";

function FlyingLetters({ letter }: { letter: string }) {
  const [isPhaserReady, setIsPhaserReady] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null); // Ref for the container div
  const gameRef = useRef<Phaser.Game | null>(null);

  const [letters, setLetters] = useState<string[]>(["a", "s", "s", "a", "b"]); // Initial letters
  const difficulty = useAppSelector(getDifficulty);

  const onPhaserReady = () => {
    setIsPhaserReady(true); // Update the state when Phaser is ready
  };
  // console.log(difficulty);

  // useEffect(() => {
  //   // setLetters([letter, ...additionalLetters]);
  //   setLetters(["a", "s", "s", "a", "b"]);
  // }, [difficulty, letter]);

  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: containerWidth,
      height: containerHeight,
      backgroundColor: "#f5f5f5",
      parent: "flying-letters",
      scene: [Preloader, new MainScene(onPhaserReady)],
    };

    gameRef.current = new Phaser.Game(config);

    const handleResize = () => {
      if (gameRef.current && containerRef.current) {
        const newWidth = containerRef.current.offsetWidth;
        const newHeight = containerRef.current.offsetHeight;
        gameRef.current.scale.resize(newWidth, newHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  useEffect(() => {
    gameDataService.notify(letters);
  }, [isPhaserReady, letters]);

  return (
    <div ref={containerRef} className="h-full w-full" id="flying-letters" />
  );
}

export default FlyingLetters;
