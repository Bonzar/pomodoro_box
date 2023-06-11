import type { WeekDayIndex } from "../../constants.ts";

export const getTodayWeekDayIndex = (isSundayFirstWeekday: boolean) => {
  const weekDayIndex = new Date().getDay();

  if (isSundayFirstWeekday) {
    return weekDayIndex as WeekDayIndex;
  }

  return (weekDayIndex === 0 ? 6 : weekDayIndex - 1) as WeekDayIndex;
};
