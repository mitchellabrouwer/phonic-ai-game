"use client";

import Dashboard from "../components/dashboard/Dashboard";
import { OrientationProvider } from "../context/OrientationProvider";

export default function Home() {
  return (
    <main className="flex justify-center">
      <OrientationProvider>
        <Dashboard />
      </OrientationProvider>
    </main>
  );
}
