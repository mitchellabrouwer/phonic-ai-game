"use client";

import { Provider } from "react-redux";
import Dashboard from "../components/dashboard/Dashboard";
import { OrientationProvider } from "../context/OrientationProvider";
import { store } from "../state/store";

export default function Home() {
  return (
    <main className="h-full min-h-screen items-center justify-center overflow-hidden pb-[100px]">
      <Provider store={store}>
        <OrientationProvider>
          <Dashboard />
        </OrientationProvider>
      </Provider>
    </main>
  );
}
