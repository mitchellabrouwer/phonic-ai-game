import { useSelector } from "react-redux";
import miniGames from "../../levels/games";
import { RootState } from "../../redux/store";
import Detective from "./Detective";
import Introduction from "./Introduction";
import Memory from "./Memory";

interface MiniGamesProps {
  letter: string;
}

const getMiniGameIndex = (state: RootState) => state.game.miniGame;

function MiniGames({ letter }: MiniGamesProps) {
  const miniGameIndex = useSelector(getMiniGameIndex);
  const game = miniGames[letter][miniGameIndex];

  switch (game) {
    case "introduction":
      return <Introduction />;
    case "memory":
      return <Memory />;
    case "detective":
      return <Detective />;
    default:
      return <div>Game not found</div>;
  }
}

export default MiniGames;
