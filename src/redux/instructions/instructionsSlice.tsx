/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
};

const instructionsSlice = createSlice({
  name: "instructions",
  initialState,
  reducers: {
    toggleVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggleVisibility } = instructionsSlice.actions;
export const instructionsReducer = instructionsSlice.reducer;
