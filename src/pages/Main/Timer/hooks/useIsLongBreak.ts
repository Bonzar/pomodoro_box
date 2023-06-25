import { useAppSelector } from "../../../../store/hooks.ts";
import { selectTodayStats } from "../../../../store/statsSlice.ts";
import { joinStats } from "../../../Stats/joinStats.ts";
import { selectTimer } from "../../../../store/timerSlice.ts";

export const useIsLongBreak = () => {
  const { type: timerType, longBreakFrequency } = useAppSelector(selectTimer);

  const todayStats = useAppSelector(selectTodayStats);
  const { completedPomo, stopsCount } = joinStats(todayStats);

  const isTypeFocus = timerType === "FOCUS";

  return (
    !isTypeFocus &&
    longBreakFrequency !== 0 &&
    (completedPomo + stopsCount) % longBreakFrequency === 0
  );
};
