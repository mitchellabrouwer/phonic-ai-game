"use client";

import Dashboard from "../components/dashboard/Dashboard";
import { OrientationProvider } from "../context/OrientationProvider";

export default function Home() {
  return (
    <main className="h-full min-h-screen items-center justify-center overflow-hidden pb-[100px]">
      <OrientationProvider>
        <Dashboard />
      </OrientationProvider>
    </main>
  );
}
