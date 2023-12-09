import { useEffect, useState } from "react";
import miniGameData from "../../../levels/miniGameData";
import backgrounds from "../../../lib/paths/backgrounds";
import { useAppDispatch, useAppSelector } from "../../../lib/redux";
import {
  displayInstructions,
  hideInstructions,
} from "../../../redux/instructions/instructionsSlice";
import { getDifficulty, getShowInstructions } from "../../../redux/selectors";
import Background from "../../background/Background";
import Instructions from "../Instructions";
import FlyingLetter from "./FlyingLetter";

interface IntroductionProps {
  letter: string;
}

function Introduction({ letter }: IntroductionProps) {
  const showInstructions = useAppSelector(getShowInstructions);
  const difficulty = useAppSelector(getDifficulty);
  const dispatch = useAppDispatch();
  const [letters, setLetters] = useState<string[]>([letter]); // Initial letters

  useEffect(() => {
    dispatch(displayInstructions());

    return () => {
      dispatch(hideInstructions());
    };
  }, [dispatch]);

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

  return (
    <Background src={backgrounds.sky}>
      <div className="h-screen w-screen">
        {showInstructions ? (
          <Instructions
            letter={letter}
            title={miniGameData[letter].title}
            introduction={miniGameData[letter].introduction}
            howToPlay={miniGameData[letter].howToPlay}
          />
        ) : (
          <div>
            {letters.map((l, index) => (
              <FlyingLetter
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                letter={l}
                onLetterClick={handleLetterClick}
              />
            ))}
          </div>
        )}
      </div>
    </Background>
  );
}

export default Introduction;
