import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";

interface ITimer {
  type: "FOCUS" | "BREAK";
  state: "IDLE" | "RUN" | "PAUSE";
  startPointAt: number | null; // timestamp
  startRunningAt: number | null; // timestamp
  stoppedAt: number | null; // timestamp
  focusDuration: number; // min
  breakDurationShort: number; // min
  breakDurationLong: number; // min
  addTimeDuration: number; // min
}

const initialState: ITimer = {
  type: "FOCUS",
  state: "IDLE",
  startPointAt: null,
  startRunningAt: null,
  stoppedAt: null,
  focusDuration: 25,
  breakDurationShort: 5,
  breakDurationLong: 20,
  addTimeDuration: 1,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.state = "RUN";
      state.startPointAt = Date.now();
      state.startRunningAt = Date.now();
      state.stoppedAt = null;
    },
    stopTimer: (state) => {
      state.state = "PAUSE";
      state.stoppedAt = Date.now();
      state.startRunningAt = null;
    },
    resumeTimer: (state) => {
      state.state = "RUN";

      if (!state.startPointAt || !state.stoppedAt) {
        return;
      }

      // new start point, that represent time from now, without already passed timer time
      // subtract difference between start and stop from now
      state.startPointAt = Date.now() - (state.stoppedAt - state.startPointAt);
      state.startRunningAt = Date.now();
      state.stoppedAt = null;
    },
    addTimeToTimer: (state) => {
      if (!state.startPointAt) return;

      state.startPointAt += state.addTimeDuration * 60 * 1000;
    },
    endTimer: (state) => {
      state.state = "IDLE";
      state.startPointAt = null;
      state.stoppedAt = null;
      state.startRunningAt = null;
      state.type = state.type === "FOCUS" ? "BREAK" : "FOCUS";
    },
  },
});

export const { startTimer, stopTimer, resumeTimer, endTimer, addTimeToTimer } =
  timerSlice.actions;

export const selectTimer = (state: RootState) => state.timer;

export const timerSliceReducer = timerSlice.reducer;
