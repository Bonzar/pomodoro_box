import { useAppSelector } from "../store/hooks.ts";
import { selectIsSundayFirstWeekday } from "../store/statsSlice.ts";
import { getTodayWeekDayIndex } from "../helpers/js/dateAndTime/getTodayWeekDayIndex.ts";

export const useTodayWeekdayIndex = () => {
  const isSundayFirstWeekday = useAppSelector(selectIsSundayFirstWeekday);
  return getTodayWeekDayIndex(isSundayFirstWeekday);
};
