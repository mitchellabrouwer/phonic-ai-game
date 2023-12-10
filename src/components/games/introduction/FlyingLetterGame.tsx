import dynamic from "next/dynamic";

interface IntroductionProps {
  letter: string;
}

const DynamicFlyingLetters = dynamic(() => import("./FlyingLetterPhaser"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

function FlyingLetterGame({ letter }: IntroductionProps) {
  return <DynamicFlyingLetters letter={letter} />;
}

export default FlyingLetterGame;
