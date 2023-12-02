import Link from "next/link";
import { FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";
import levels from "../../levels/levels";
import tiles from "../../lib/tiles";
import {
  getCompletedLetters,
  getLandIndex,
  getLetterIndex,
} from "../../state/game/gameSlice";
import { Tile } from "../../types/types";

interface TileProps {
  square: Tile;
}

function Square({ square }: TileProps) {
  const landIndex = useSelector(getLandIndex);
  const letterIndex = useSelector(getLetterIndex);
  const completedLetters = useSelector(getCompletedLetters);

  const currentLetter = levels[landIndex][letterIndex].letter;
  const isCurrentLetter = square.letter === currentLetter;
  const isCompletedLetter = square.letter && square.letter in completedLetters;

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
  const hoverEffectStyles = "transition-transform transform hover:scale-105";

  let letterDisplay = <FaLock />;
  if (isCompletedLetter) {
    letterDisplay = <span className="text-9xl" />;
  }
  if (isCurrentLetter) {
    letterDisplay = <span className="text-9xl" />;
  }

  return isCurrentLetter || isCompletedLetter ? (
    <Link
      href={`/${square.letter}`}
      style={commonStyles}
      className={`${hoverEffectStyles} flex min-h-[10vw] min-w-[10vw] items-center justify-center md:min-h-[6.5vw] md:min-w-[6.5vw] lg:min-h-[5vw] lg:min-w-[5vw]`}
    >
      {letterDisplay}
    </Link>
  ) : (
    <div
      style={commonStyles}
      className={`${hoverEffectStyles} min-h-[10vw] min-w-[10vw] md:min-h-[6.5vw] md:min-w-[6.5vw] lg:min-h-[5vw] lg:min-w-[5vw]`}
    >
      {letterDisplay}
    </div>
  );
}

export default Square;
