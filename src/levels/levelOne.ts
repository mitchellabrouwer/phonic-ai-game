import { AttractionProps, Tile } from "../types/types";

const ATTRACTION_SIZE = 3;

const ATTRACTIONS: AttractionProps[] = [
  { letter: "s", character: "sammy", image: "soil" },
  { letter: "a", character: "amy", image: "soil" },
  { letter: "t", character: "toby", image: "soil" },
  { letter: "i", character: "izzy", image: "soil" },
  { letter: "p", character: "penny", image: "soil" },
  { letter: "n", character: "nelly", image: "soil" },
];

const buildAttractions = (placeholders: typeof ATTRACTIONS): Tile[] => {
  const attractionsRow: Tile[] = [{ image: "straight", rotate: 90 }];

  placeholders.forEach(({ image, letter, character }) => {
    attractionsRow.push({
      image,
      letter,
      character,
      width: ATTRACTION_SIZE,
      height: ATTRACTION_SIZE,
      button: true,
    });
  });

  attractionsRow.push({ image: "straight", rotate: 90 }); // Road at the end of the row
  return attractionsRow;
};

const buildDivider = (totalWidth: number): Tile[] => {
  const tiles: Tile[] = [{ image: "intersection" }];
  tiles.push(...new Array(totalWidth).fill({ image: "straight" }));
  tiles.push({ image: "intersection" });
  return tiles;
};

const buildFiller = (repetitions: number): Tile[] => {
  return [...new Array(repetitions).fill({ image: "straight", rotate: 90 })];
};

const createLevelSection = (
  index: number,
  width: number,
  fillers: number,
  totalWidth: number,
  fillerWidth: number,
) => [
  buildDivider(totalWidth),
  buildAttractions(ATTRACTIONS.slice(index * width, (index + 1) * width)),
  ...Array.from({ length: fillers }, () => buildFiller(fillerWidth)),
];

export const levelOneLand = (): Tile[][] => {
  const attractionsPerRow = 4;
  const attractionsPerColumn = 2;
  const totalWidth = attractionsPerRow * ATTRACTION_SIZE + 2;
  const fillers = ATTRACTION_SIZE - 1;
  const fillerWidth = totalWidth - ATTRACTION_SIZE * attractionsPerRow;

  const level = Array.from({ length: attractionsPerColumn }, (_, index) =>
    createLevelSection(
      index,
      attractionsPerRow,
      fillers,
      totalWidth,
      fillerWidth,
    ),
  ).flat();

  level.push(buildDivider(totalWidth));

  return level;
};

export const levelOnePort = (): Tile[][] => {
  const width = 2;
  const height = 4;
  const filler = ATTRACTION_SIZE - 1;

  const test = Array.from({ length: height }, (_, index) =>
    createLevelSection(index, width, filler),
  ).flat();

  console.log(test);
  return test;
};
