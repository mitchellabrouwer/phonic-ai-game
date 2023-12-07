import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./game/gameSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      game: gameReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
