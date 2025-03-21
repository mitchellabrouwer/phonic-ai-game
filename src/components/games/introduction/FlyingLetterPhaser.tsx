import Phaser from "phaser";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../lib/redux";
import {
  getDifficulty,
  getLandIndex,
  getLives,
} from "../../../redux/selectors";
import { GameVariables } from "../../../types/types";
import MainScene from "./phaser/MainScene";
import Preloader from "./phaser/Preloader";

function FlyingLetters({ letter }: { letter: string }) {
  const [, setIsPhaserReady] = useState(false);
  const [gameVariables, setGameVariables] = useState<GameVariables | null>(
    null,
  );

  // console.log(gameVariables);

  const containerRef = useRef<HTMLDivElement>(null); // Ref for the container div
  const gameRef = useRef<Phaser.Game | null>(null);

  const lives = useAppSelector(getLives);
  const difficulty = useAppSelector(getDifficulty);
  const land = useAppSelector(getLandIndex);

  const onPhaserReady = () => {
    setIsPhaserReady(true);
  };

  const onPhaserComplete = (variables: GameVariables) => {
    setGameVariables(variables);
  };

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
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: [
        Preloader,
        new MainScene(
          {
            lives,
            difficulty,
            land,
            letter,
          },
          onPhaserComplete,
        ),
      ],
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

  return (
    <div ref={containerRef} className="h-full w-full" id="flying-letters" />
  );
}

export default FlyingLetters;
