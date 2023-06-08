import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";

export type IStatNoteDuration = {
  type: "TIMER_FOCUS" | "TIMER_BREAK" | "PAUSE";
  milliseconds: number;
};

export type IStatNoteStop = {
  type: "STOP"; // only Focus stops
};

export type IStatNoteCompletedPomo = {
  type: "POMO"; // only Focus completed pomo
};

type IStatNoteWithoutTimestamp =
  | IStatNoteDuration
  | IStatNoteStop
  | IStatNoteCompletedPomo;

type IStatNote = { createdAt: number } & IStatNoteWithoutTimestamp;

const statsAdapter = createEntityAdapter<IStatNote>({
  selectId: (model) => model.createdAt,
  sortComparer: (a, b) => b.createdAt - a.createdAt,
});

const initialState = statsAdapter.getInitialState();

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    addStatNote: {
      reducer: statsAdapter.addOne,
      prepare: (statsNote: IStatNoteWithoutTimestamp) => ({
        payload: { ...statsNote, createdAt: Date.now() },
      }),
    },
  },
});

export const { addStatNote } = statsSlice.actions;

export const {
  selectById: selectStatNoteByTimestamp,
  selectAll: selectAllStatistic,
} = statsAdapter.getSelectors((state: RootState) => state.stats);

const getCurrentWeekCorners = (weekShift = 0) => {
  const todayWithoutShift = new Date();
  const today = new Date(
    todayWithoutShift.setDate(todayWithoutShift.getDate() - 7 * weekShift)
  );

  const firstDayOfCurrentWeekInMonth = today.getDate() - today.getDay() + 1;
  const lastDayOfCurrentWeekInMonth = firstDayOfCurrentWeekInMonth + 7;

  const firstWeekDayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    firstDayOfCurrentWeekInMonth,
    0,
    0,
    0,
    0
  );

  const lastWeekDayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    lastDayOfCurrentWeekInMonth,
    0,
    0,
    0,
    0
  );

  return { firstWeekDayDate, lastWeekDayDate };
};

export const selectStatsByWeek = (state: RootState, weekShift: 0 | -1 | -2) => {
  const stats = selectAllStatistic(state);
  const { lastWeekDayDate, firstWeekDayDate } =
    getCurrentWeekCorners(weekShift);

  const lastWeekDayEndOfDayTimestamp =
    lastWeekDayDate.getTime() + 24 * 60 * 60 * 1000 - 1;

  return stats.filter(
    (statItem) =>
      statItem.createdAt >= firstWeekDayDate.getTime() &&
      statItem.createdAt <= lastWeekDayEndOfDayTimestamp
  );
};

export const statsSliceReducer = statsSlice.reducer;
