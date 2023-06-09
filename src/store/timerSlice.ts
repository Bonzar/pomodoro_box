import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";
import {
  MILLISECONDS_IN_MINUTE,
  SETTINGS_MIN_VALUE,
} from "../helpers/constants.ts";
import { exhaustiveCheck } from "../helpers/js/exhaustiveCheck.ts";
import { toast } from "sonner";
import logoIconSrc from "../assets/icons/logo.svg";

interface ITimerControlFields {
  type: "FOCUS" | "BREAK";
  state: "IDLE" | "RUN" | "PAUSE";
  startPointAt: number | null; // timestamp
  runningAt: number | null; // timestamp
  stoppedAt: number | null; // timestamp
}

export interface ITimerSettings {
  focusDuration: number; // min
  breakDurationShort: number; // min
  breakDurationLong: number; // min
  addTimeDuration: number; // min
}

type ITimer = ITimerControlFields & ITimerSettings;

const initialState: ITimer = {
  type: "FOCUS",
  state: "IDLE",
  startPointAt: null,
  runningAt: null,
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
      state.runningAt = Date.now();
      state.stoppedAt = null;
    },
    stopTimer: (state) => {
      state.state = "PAUSE";
      state.stoppedAt = Date.now();
      state.runningAt = null;
    },
    resumeTimer: (state) => {
      state.state = "RUN";

      if (!state.startPointAt) {
        toast.error("Отсутствует стартовая отметка времени таймера!");
        return;
      } else if (!state.stoppedAt) {
        toast.error("Отсутствует время остановки таймера!");
        return;
      }

      // new start point, that represent time from now, without already passed timer time
      // subtract difference between start and stop from now
      state.startPointAt = Date.now() - (state.stoppedAt - state.startPointAt);
      state.runningAt = Date.now();
      state.stoppedAt = null;
    },
    addTimeToTimer: (state) => {
      if (!state.startPointAt) {
        toast.error("Отсутствует стартовая отметка времени таймера!");
        return;
      }

      state.startPointAt += state.addTimeDuration * MILLISECONDS_IN_MINUTE;
    },
    endTimer: (state) => {
      state.state = "IDLE";
      state.startPointAt = null;
      state.stoppedAt = null;
      state.runningAt = null;
      const isTypeFocus = state.type === "FOCUS";

      state.type = isTypeFocus ? "BREAK" : "FOCUS";
      try {
        Notification.requestPermission().then((permission) => {
          if (permission === "denied") return;

          new Notification("Pomodoro_box", {
            body: isTypeFocus
              ? "Помидор завершен, пора отдохнуть!"
              : "Перерыв завершен, пора поработать!",
            icon: logoIconSrc,
            badge: logoIconSrc,
            renotify: true,
            vibrate: 1,
          });
        });
      } catch (e) {
        console.error(e);
      }
    },
    updateSettings: (state, action: PayloadAction<Partial<ITimerSettings>>) => {
      for (const [propName, newValue] of Object.entries(action.payload)) {
        const settingProp = propName as keyof ITimerSettings;

        switch (settingProp) {
          case "focusDuration":
          case "addTimeDuration":
          case "breakDurationLong":
          case "breakDurationShort":
            state[settingProp] = newValue > 0 ? newValue : SETTINGS_MIN_VALUE;
            break;
          default:
            exhaustiveCheck(settingProp);
        }
      }
    },
  },
});

export const {
  startTimer,
  stopTimer,
  resumeTimer,
  endTimer,
  addTimeToTimer,
  updateSettings,
} = timerSlice.actions;

export const selectTimer = (state: RootState) => state.timer;

export const timerSliceReducer = timerSlice.reducer;
