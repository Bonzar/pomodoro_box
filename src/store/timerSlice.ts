import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";

interface ITimerState {
  type: "FOCUS" | "PAUSE";
  state: "IDLE" | "STARTED" | "STOPPED";
  startedAt: number | null; // timestamp
  stoppedAt: number | null; // timestamp
  focusDuration: number; // min
  pauseDurationShort: number; // min
  pauseDurationLong: number; // min
  addTimeDuration: number; // min
}

const initialState: ITimerState = {
  type: "FOCUS",
  state: "IDLE",
  startedAt: null,
  stoppedAt: null,
  focusDuration: 1,
  pauseDurationShort: 5,
  pauseDurationLong: 20,
  addTimeDuration: 1,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.state = "STARTED";
      state.startedAt = Date.now();
      state.stoppedAt = null;
    },
    stopTimer: (state) => {
      state.state = "STOPPED";
      state.stoppedAt = Date.now();
    },
    resumeTimer: (state) => {
      state.state = "STARTED";

      if (!state.startedAt || !state.stoppedAt) {
        return;
      }

      // new start point, that represent time from now, without already passed timer time
      // subtract difference between start and stop from now
      state.startedAt = Date.now() - (state.stoppedAt - state.startedAt);
      state.stoppedAt = null;
    },
    addTimeToTimer: (state) => {
      if (!state.startedAt) return;

      state.startedAt += state.addTimeDuration * 60 * 1000;
    },
    endTimer: (state) => {
      state.state = "IDLE";
      state.startedAt = null;
      state.stoppedAt = null;
      state.type = state.type === "FOCUS" ? "PAUSE" : "FOCUS";
    },
  },
});

export const { startTimer, stopTimer, resumeTimer, endTimer, addTimeToTimer } =
  timerSlice.actions;

export const selectTimer = (state: RootState) => state.timer;

export const timerSliceReducer = timerSlice.reducer;
