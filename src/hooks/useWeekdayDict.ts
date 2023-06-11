import { getWeekdayDict } from "../helpers/js/dateAndTime/getWeekdayDict.ts";
import { useAppSelector } from "../store/hooks.ts";
import { selectIsSundayFirstWeekday } from "../store/statsSlice.ts";

export const useWeekdayDict = (isShortNames = false) => {
  const isSundayFirstWeekday = useAppSelector(selectIsSundayFirstWeekday);

  return getWeekdayDict(isSundayFirstWeekday, isShortNames);
};
