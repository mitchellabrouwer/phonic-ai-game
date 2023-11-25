import { Tile, TileName } from "../../types/types";

const fillerRow: Tile[] = [
  ...new Array(5).fill({ image: "straight", rotate: 90 }),
];

interface AttractionProps {
  image: TileName;
  letter: string;
  character: string;
}

const attractions = (placeholders: AttractionProps[]): Tile[] => {
  const attractionsRow: Tile[] = placeholders.flatMap(
    ({ image, letter, character }) => [
      { image: "straight", rotate: 90 },
      {
        image,
        letter,
        character,
        width: 3,
        height: 3,
        button: true,
      },
    ],
  );

  return [
    ...attractionsRow,
    { image: "straight", rotate: 90 },
    ...fillerRow,
    ...fillerRow,
  ];
};

const divider: Tile[] = [
  { image: "intersection" },
  ...new Array(3).fill({ image: "straight" }),
  { image: "intersection" },
  ...new Array(3).fill({ image: "straight" }),
  { image: "intersection" },
  ...new Array(3).fill({ image: "straight" }),
  { image: "intersection" },
  ...new Array(3).fill({ image: "straight" }),
  { image: "intersection" },
];

const levelOne: Tile[][] = [
  // 4x3 grid
  divider,
  attractions([
    { letter: "s", character: "sammy", image: "amy_orchard_1" },
    { letter: "t", character: "toby", image: "soil" },
    { letter: "i", character: "izzy", image: "soil" },
    { letter: "n", character: "nelly", image: "soil" },
  ]),
  divider,
  attractions([
    { letter: "s", character: "sammy", image: "soil" },
    { letter: "t", character: "toby", image: "soil" },
    { letter: "i", character: "izzy", image: "soil" },
    { letter: "n", character: "nelly", image: "soil" },
  ]),
  divider,
  attractions([
    { letter: "s", character: "sammy", image: "soil" },
    { letter: "t", character: "toby", image: "soil" },
    { letter: "i", character: "izzy", image: "soil" },
    { letter: "n", character: "nelly", image: "soil" },
  ]),
  divider,
];

export default levelOne;
