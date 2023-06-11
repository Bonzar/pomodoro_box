import { getTodayWeekDayIndex } from "./getTodayWeekDayIndex.ts";

export const getCurrentWeekCornerDays = (isSundayFirstWeekday: boolean) => {
  const today = new Date();

  const firstDayOfCurrentWeekInMonth =
    today.getDate() - getTodayWeekDayIndex(isSundayFirstWeekday);
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
