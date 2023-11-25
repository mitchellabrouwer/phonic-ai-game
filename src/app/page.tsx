import Grid from "../components/Grid";
import levelOne from "./levels/levelOne";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <SimpleGrid /> */}
      <Grid gridData={levelOne} />
    </main>
  );
}
