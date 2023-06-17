import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";
import {
  MILLISECONDS_IN_MINUTE,
  RANGE_SETTING_DEFAULT_MIN_VALUE,
} from "../helpers/constants.ts";
import { exhaustiveCheck } from "../helpers/js/exhaustiveCheck.ts";
import { toast } from "sonner";

interface ITimerControlFields {
  type: "FOCUS" | "BREAK";
  state: "IDLE" | "RUN" | "PAUSE";
  startPointAt: number | null; // timestamp
  runningAt: number | null; // timestamp
  stoppedAt: number | null; // timestamp
}

export interface ITimerDurationSettings {
  focusDuration: number; // min
  breakDurationShort: number; // min
  breakDurationLong: number; // min
  addTimeDuration: number; // min
  longBreakFrequency: number; // count
}

interface ITimerOtherSettings {
  notificationPermission: NotificationPermission;
}

export type ITimer = ITimerControlFields &
  ITimerDurationSettings &
  ITimerOtherSettings;

export const initialState: ITimer = {
  type: "FOCUS",
  state: "IDLE",
  startPointAt: null,
  runningAt: null,
  stoppedAt: null,
  focusDuration: 25,
  breakDurationShort: 5,
  breakDurationLong: 20,
  addTimeDuration: 1,
  longBreakFrequency: 4,
  notificationPermission: "default",
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
    },
    updateSettings: (
      state,
      action: PayloadAction<Partial<ITimerDurationSettings>>
    ) => {
      for (const [propName, newValue] of Object.entries(action.payload)) {
        const settingProp = propName as keyof ITimerDurationSettings;

        switch (settingProp) {
          case "focusDuration":
          case "addTimeDuration":
          case "breakDurationLong":
          case "breakDurationShort":
            state[settingProp] =
              newValue >= RANGE_SETTING_DEFAULT_MIN_VALUE
                ? newValue
                : RANGE_SETTING_DEFAULT_MIN_VALUE;
            break;
          case "longBreakFrequency":
            state[settingProp] = newValue > 0 ? newValue : 0;
            break;
          default:
            exhaustiveCheck(settingProp);
        }
      }
    },
    setNotificationPermission: (
      state,
      action: PayloadAction<NotificationPermission>
    ) => {
      state.notificationPermission = action.payload;
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
  setNotificationPermission,
} = timerSlice.actions;

export const selectTimer = (state: RootState) => state.timer;

export const selectNotificationPermission = (state: RootState) =>
  state.timer.notificationPermission;

export const timerSliceReducer = timerSlice.reducer;
