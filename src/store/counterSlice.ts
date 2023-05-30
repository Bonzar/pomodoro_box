import type { RootState } from "./store.ts";
import { createSlice } from "@reduxjs/toolkit";

interface ICounterState {
  value: number;
}

const initialState: ICounterState = {
  value: 10,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementCounter: (state) => {
      state.value++;
    },
  },
});

export const { incrementCounter } = counterSlice.actions;

export const selectCounter = (state: RootState) => state.counter;

export const CounterSliceReducer = counterSlice.reducer;
