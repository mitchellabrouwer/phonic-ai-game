import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./game/gameSlice";
import { instructionsReducer } from "./instructions/instructionsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      game: gameReducer,
      instructions: instructionsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
