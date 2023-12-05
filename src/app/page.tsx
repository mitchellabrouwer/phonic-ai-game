"use client";

import { Provider } from "react-redux";
import Dashboard from "../components/dashboard/Dashboard";
import Navbar from "../components/navigation/Navbar";
import { OrientationProvider } from "../context/OrientationProvider";
import store from "../state/store";

export default function Home() {
  return (
    <main className="h-full min-h-screen items-center justify-center overflow-hidden pb-[100px]">
      <Provider store={store}>
        <OrientationProvider>
          <div className="flex h-full flex-col">
            <Navbar />
            <Dashboard />
          </div>
        </OrientationProvider>
      </Provider>
    </main>
  );
}
