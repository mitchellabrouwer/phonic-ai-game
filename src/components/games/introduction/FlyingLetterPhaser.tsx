import Phaser from "phaser";
import { useEffect, useRef } from "react";
import MainScene from "./MainScene";
import Preloader from "./Preloader";

function FlyingLetters() {
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the container div
  const gameRef = useRef<Phaser.Game | null>(null);

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
      scene: [Preloader, MainScene],
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
  });

  return (
    <div ref={containerRef} className="h-full w-full" id="flying-letters" />
  );
}

export default FlyingLetters;
