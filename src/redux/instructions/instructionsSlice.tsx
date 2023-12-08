/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
};

const instructionsSlice = createSlice({
  name: "instructions",
  initialState,
  reducers: {
    displayInstructions: (state) => {
      state.isVisible = true;
    },

    hideInstructions: (state) => {
      state.isVisible = false;
    },

    toggleInstructions: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { displayInstructions, hideInstructions, toggleInstructions } =
  instructionsSlice.actions;
export const instructionsReducer = instructionsSlice.reducer;
