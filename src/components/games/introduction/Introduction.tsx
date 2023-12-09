import { useEffect } from "react";
import miniGameData from "../../../levels/miniGameData";
import backgrounds from "../../../lib/paths/backgrounds";
import { useAppDispatch, useAppSelector } from "../../../lib/redux";
import {
  displayInstructions,
  hideInstructions,
} from "../../../redux/instructions/instructionsSlice";
import { getShowInstructions } from "../../../redux/selectors";
import Background from "../../background/Background";
import Instructions from "../Instructions";

interface IntroductionProps {
  letter: string;
}

function Introduction({ letter }: IntroductionProps) {
  const showInstructions = useAppSelector(getShowInstructions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(displayInstructions());

    return () => {
      dispatch(hideInstructions());
    };
  }, [dispatch]);

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
          <div>the game</div>
        )}
      </div>
    </Background>
  );
}

export default Introduction;
