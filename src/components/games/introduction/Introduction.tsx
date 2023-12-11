import dynamic from "next/dynamic";
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

const DynamicFlyingLetters = dynamic(() => import("./FlyingLetterPhaser"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

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

  if (showInstructions) {
    return (
      <Instructions
        letter={letter}
        title={miniGameData[letter].title}
        introduction={miniGameData[letter].introduction}
        howToPlay={miniGameData[letter].howToPlay}
      />
    );
  }

  return (
    <Background src={backgrounds.sky}>
      <div className="h-screen w-screen">
        <DynamicFlyingLetters letter={letter} />;
      </div>
    </Background>
  );
}

export default Introduction;
