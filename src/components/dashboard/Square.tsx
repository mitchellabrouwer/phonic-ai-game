import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import { FaLock } from "react-icons/fa";
import levels from "../../levels/levels";
import tiles from "../../lib/paths/mapPieces";

import { useAppSelector } from "../../lib/redux";
import {
  getCompletedLetters,
  getLandIndex,
  getLetterIndex,
} from "../../redux/selectors";
import { Tile } from "../../types/types";

interface TileProps {
  square: Tile;
}

function Square({ square }: TileProps) {
  const landIndex = useAppSelector(getLandIndex);
  const letterIndex = useAppSelector(getLetterIndex);
  const completedLetters = useAppSelector(getCompletedLetters);

  const currentLetter = levels[landIndex][letterIndex].letter;

  const isCurrentLetter = square.letter === currentLetter;

  const isCompletedLetter = square.letter && square.letter in completedLetters;
  const notLetter = !square.character || !square.letter;

  const bgImageUrl = square.bg ? tiles[square.bg] : undefined;
  const defaultImageUrl = square.image ? tiles[square.image] : undefined;
  const imageUrl =
    isCompletedLetter && bgImageUrl ? bgImageUrl : defaultImageUrl;

  const rotationDegrees = String(square.rotate) ?? "0";
  const gridColumnSpan = `span ${square.width ?? 1}`;
  const gridRowSpan = `span ${square.height ?? 1}`;

  const commonStyles = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    gridColumnEnd: gridColumnSpan,
    gridRowEnd: gridRowSpan,
    transform: `rotate(${rotationDegrees}deg)`,
    boxShadow: isCurrentLetter ? "0 0 10px #fff" : "none",
  };

  const overlayStyles: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle, rgba(233, 64, 87, 0.7), rgba(144, 19, 254, 0.7))",
    zIndex: 1,
  };

  if (isCurrentLetter) {
    return (
      <Link
        href={`letters/${square.letter}`}
        className="shadow-pulse relative flex min-h-[10vw] min-w-[10vw] animate-pulse items-center justify-center rounded border-8 border-transparent transition-all duration-300 hover:shadow-lg md:min-h-[6.5vw] md:min-w-[6.5vw] lg:min-h-[5vw] lg:min-w-[5vw]"
        style={commonStyles}
      >
        <span className="relative z-10 transform text-8xl text-white transition-transform hover:scale-110">
          {square.letter}
        </span>
        <span style={overlayStyles} />
      </Link>
    );
  }

  if (notLetter) {
    return (
      <div
        style={commonStyles}
        className="min-h-[10vw] min-w-[10vw] md:min-h-[6.5vw] md:min-w-[6.5vw] lg:min-h-[5vw] lg:min-w-[5vw]"
      />
    );
  }

  if (isCompletedLetter) {
    return (
      <Image
        src={square.bg || "default here"}
        width={250}
        height={250}
        alt="Alphabet Wonderland logo"
      />
    );
  }

  if (!isCompletedLetter) {
    return (
      <div
        style={commonStyles}
        className="flex h-full items-center justify-center"
      >
        <FaLock size={80} color="#808080" />
      </div>
    );
  }
}

export default Square;
