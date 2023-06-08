import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";

export interface ITimer {
  type: "FOCUS" | "BREAK";
  state: "IDLE" | "RUN" | "PAUSE";
  startedAt: number | null; // timestamp
  stoppedAt: number | null; // timestamp
  resumedAt: number | null; // timestamp
  focusDuration: number; // min
  breakDurationShort: number; // min
  breakDurationLong: number; // min
  addTimeDuration: number; // min
}

const initialState: ITimer = {
  type: "FOCUS",
  state: "IDLE",
  startedAt: null,
  stoppedAt: null,
  resumedAt: null,
  focusDuration: 1,
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
      state.startedAt = Date.now();
      state.stoppedAt = null;
      state.resumedAt = null;
    },
    stopTimer: (state) => {
      state.state = "PAUSE";
      state.stoppedAt = Date.now();
      state.resumedAt = null;
    },
    resumeTimer: (state) => {
      state.state = "RUN";

      if (!state.startedAt || !state.stoppedAt) {
        return;
      }

      // new start point, that represent time from now, without already passed timer time
      // subtract difference between start and stop from now
      state.startedAt = Date.now() - (state.stoppedAt - state.startedAt);
      state.resumedAt = Date.now();
      state.stoppedAt = null;
      // Disabled for test saving stats
      // state.stoppedAt = null;
    },
    addTimeToTimer: (state) => {
      if (!state.startedAt) return;

      state.startedAt += state.addTimeDuration * 60 * 1000;
    },
    endTimer: (state) => {
      state.state = "IDLE";
      state.startedAt = null;
      state.stoppedAt = null;
      state.resumedAt = null;
      state.type = state.type === "FOCUS" ? "BREAK" : "FOCUS";
    },
  },
});

export const { startTimer, stopTimer, resumeTimer, endTimer, addTimeToTimer } =
  timerSlice.actions;

export const selectTimer = (state: RootState) => state.timer;

export const timerSliceReducer = timerSlice.reducer;
