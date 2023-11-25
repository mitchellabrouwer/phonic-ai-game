import Grid from "../components/Grid";
import { TileName } from "../types/types";

const map: TileName[][] = [
  ["road_tile_06_tile", "soil", "grass", "water"],
  ["bush_01", "rock_01", "road_main_layer1", "road_tile_03_layer2"],
  ["finish", "tree_02", "izzy_ice_cream_parlor_2", "sammy_slide_park"],
  ["start", "road_tile_08_layer3", "grass", "bush_02"],
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Grid gridData={map} />
    </main>
  );
}
