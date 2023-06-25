import { MILLISECONDS_IN_MINUTE } from "../../../../helpers/constants.ts";
import { useAppSelector } from "../../../../store/hooks.ts";
import { selectTimer } from "../../../../store/timerSlice.ts";
import { useIsLongBreak } from "./useIsLongBreak.ts";

export const useTimerDuration = () => {
  const {
    type: timerType,
    focusDuration,
    breakDurationLong,
    breakDurationShort,
  } = useAppSelector(selectTimer);

  const isTypeFocus = timerType === "FOCUS";
  const isLongBreak = useIsLongBreak();

  return (
    MILLISECONDS_IN_MINUTE *
    (isTypeFocus
      ? focusDuration
      : isLongBreak
      ? breakDurationLong
      : breakDurationShort)
  );
};
