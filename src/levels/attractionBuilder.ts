import { ATTRACTION_SIZE } from "../lib/constants";
import { Tile } from "../types/types";

const buildAttraction = ({ letter, character, image }: Tile): Tile[] => {
  return [
    // first row
    { image: "intersection" },
    { image: "straight" },
    { image: "straight" },
    { image: "straight" },
    { image: "intersection" },
    // attraction
    { image: "straight", rotate: 90 },
    {
      letter,
      character,
      image,
      width: ATTRACTION_SIZE,
      height: ATTRACTION_SIZE,
      button: true,
    },
    { image: "straight", rotate: 90 },

    // fillers
    { image: "straight", rotate: 90 },
    { image: "straight", rotate: 90 },

    { image: "straight", rotate: 90 },
    { image: "straight", rotate: 90 },
    // bottom row
    { image: "intersection" },
    { image: "straight" },
    { image: "straight" },
    { image: "straight" },
    { image: "intersection" },
  ];
};

export default buildAttraction;
