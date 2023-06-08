import type { WeekDayIndex } from "../constants.ts";

export const getTodayWeekDayIndex = () => {
  const weekDayIndex = new Date().getDay();

  return (weekDayIndex === 0 ? 6 : weekDayIndex - 1) as WeekDayIndex;
};
