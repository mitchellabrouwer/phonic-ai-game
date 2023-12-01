"use client";

import Dashboard from "../components/dashboard/Dashboard";
import Navbar from "../components/navigation/Navbar";
import { OrientationProvider } from "../context/OrientationProvider";

export default function Home() {
  return (
    <main className="relative mt-2 flex h-full min-h-screen items-center justify-center overflow-hidden pb-[100px]">
      <OrientationProvider>
        <Dashboard />
        <Navbar />
      </OrientationProvider>
    </main>
  );
}
