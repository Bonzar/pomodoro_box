import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";
import { getCurrentWeekCornerDays } from "../helpers/getCurrentWeekCornerDays.ts";

export type IStatNoteDuration = {
  type: "FOCUS" | "BREAK" | "PAUSE";
  duration: number;
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

export const { selectAll: selectAllStatistic } = statsAdapter.getSelectors(
  (state: RootState) => state.stats
);

export const selectStatsByWeek = (state: RootState, weekShift: 0 | -1 | -2) => {
  const stats = selectAllStatistic(state);
  const { firstWeekDayDate, lastWeekDayDate } = getCurrentWeekCornerDays();

  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const millisecondsInWeek = millisecondsInDay * 7;

  const firstWeekDayTimestampWithShift =
    firstWeekDayDate.getTime() - millisecondsInWeek * Math.abs(weekShift);

  const lastWeekDayTimestampWithShift =
    lastWeekDayDate.getTime() - millisecondsInWeek * Math.abs(weekShift);

  const lastWeekDayEndOfDayTimestamp =
    lastWeekDayTimestampWithShift + millisecondsInDay - 1;

  return stats.filter(
    (statItem) =>
      statItem.createdAt >= firstWeekDayTimestampWithShift &&
      statItem.createdAt <= lastWeekDayEndOfDayTimestamp
  );
};

export const statsSliceReducer = statsSlice.reducer;
