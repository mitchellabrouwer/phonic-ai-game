export type MiniGame =
  | "introduction"
  | "memory"
  | "detective"
  | "sound_match"
  | "trace"
  | "maze";

const miniGames: Record<string, MiniGame[]> = {
  s: ["introduction", "memory", "detective"],
};

export default miniGames;
