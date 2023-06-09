import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { RootState } from "./store.ts";
import type { WeekShift } from "../pages/Stats/WeekChanger";
import { getCurrentWeekCornerDays } from "../helpers/js/getCurrentWeekCornerDays.ts";
import {
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_WEEK,
  WEEK_DAYS_INDEXES,
} from "../helpers/constants.ts";

export type IStatNoteDuration = {
  type: "FOCUS" | "BREAK" | "PAUSE";
  duration: number; // milliseconds
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

export type IStatNote = { createdAt: number } & IStatNoteWithoutTimestamp;

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

const selectStatsBetweenTimestamps = createSelector(
  [
    selectAllStatistic,
    (_, startTimestamp: number) => startTimestamp,
    (_, __, endTimestamp: number) => endTimestamp,
  ],
  (stats, startTimestamp, endTimestamp) => {
    return stats.filter(
      (statItem) =>
        statItem.createdAt >= startTimestamp &&
        statItem.createdAt < endTimestamp
    );
  }
);

export const selectTodayStats = (state: RootState) => {
  const todayTimestamp = Date.now();
  const todayStartTimestamp =
    Math.trunc(todayTimestamp / MILLISECONDS_IN_DAY) * MILLISECONDS_IN_DAY;

  return selectStatsBetweenTimestamps(
    state,
    todayStartTimestamp,
    todayStartTimestamp + MILLISECONDS_IN_DAY
  );
};

export const selectWeekStats = createSelector(
  [selectAllStatistic, (_, weekShift: WeekShift) => weekShift],
  (stats, weekShift) => {
    const { firstWeekDayDate } = getCurrentWeekCornerDays();

    const firstWeekDayTimestampWithShift =
      firstWeekDayDate.getTime() - MILLISECONDS_IN_WEEK * Math.abs(weekShift);

    return WEEK_DAYS_INDEXES.map((weekDayIndex) => {
      const dayStartPoint =
        firstWeekDayTimestampWithShift + weekDayIndex * MILLISECONDS_IN_DAY;

      return stats.filter(
        (statItem) =>
          statItem.createdAt >= dayStartPoint &&
          statItem.createdAt < dayStartPoint + MILLISECONDS_IN_DAY
      );
    });
  }
);

export const statsSliceReducer = statsSlice.reducer;
