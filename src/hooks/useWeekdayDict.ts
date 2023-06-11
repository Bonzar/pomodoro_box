import { getWeekdayDict } from "../helpers/js/dateAndTime/getWeekdayDict.ts";
import { useAppSelector } from "../store/hooks.ts";
import { selectIsSundayFirstWeekday } from "../store/statsSlice.ts";
import { useMemo } from "react";

export const useWeekdayDict = (isShortNames = false) => {
  const isSundayFirstWeekday = useAppSelector(selectIsSundayFirstWeekday);

  return useMemo(
    () => getWeekdayDict(isSundayFirstWeekday, isShortNames),
    [isShortNames, isSundayFirstWeekday]
  );
};
