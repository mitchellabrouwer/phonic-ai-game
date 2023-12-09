import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../lib/redux";
import { getDifficulty } from "../../../redux/selectors";

interface IntroductionProps {
  letter: string;
}

const DynamicFlyingLetters = dynamic(() => import("./FlyingLetterPhaser"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

function FlyingLetterGame({ letter }: IntroductionProps) {
  const difficulty = useAppSelector(getDifficulty);
  const [letters, setLetters] = useState<string[]>([letter]); // Initial letters

  useEffect(() => {
    // const additionalLetters = ...; // TBD

    // setLetters([letter, ...additionalLetters]);
    setLetters(["a", "s", "s", "a", "b"]);
  }, [difficulty, letter]);

  const handleLetterClick = (clickedLetter: string) => {
    if (clickedLetter === letter) {
      console.log("correct");
    } else {
      console.log("incorrect");
    }
  };

  return <DynamicFlyingLetters />;
}

export default FlyingLetterGame;
