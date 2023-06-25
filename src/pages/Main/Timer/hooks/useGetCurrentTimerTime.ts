import { useTimerDuration } from "./useTimerDuration.ts";
import { useAppSelector } from "../../../../store/hooks.ts";
import { selectTimer } from "../../../../store/timerSlice.ts";
import { useCallback } from "react";
import { toast } from "sonner";
import { exhaustiveCheck } from "../../../../helpers/js/exhaustiveCheck.ts";
import {
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_SECOND,
} from "../../../../helpers/constants.ts";
import { getTimeWithZero } from "../../../../helpers/js/dateAndTime/getTimeWithZero.ts";

export const useGetCurrentTimerTime = () => {
  const timerDurationMilliseconds = useTimerDuration();
  const { state, startPointAt, stoppedAt } = useAppSelector(selectTimer);

  return useCallback(() => {
    let time;
    switch (state) {
      case "IDLE": {
        time = timerDurationMilliseconds;
        break;
      }
      case "RUN": {
        if (!startPointAt) {
          toast.error("Таймер был начат, но время начало не было установлено!");
          break;
        }

        time = startPointAt + timerDurationMilliseconds - Date.now();
        break;
      }
      case "PAUSE": {
        if (!startPointAt || !stoppedAt) {
          toast.error(
            `Таймер был остановлен, но время когда таймер был ${
              !startPointAt ? "начат" : "остановлен"
            } - отсутствует!`
          );
          break;
        }

        time = timerDurationMilliseconds - (stoppedAt - startPointAt);
        break;
      }
      default:
        exhaustiveCheck(state);
    }

    if (!time) return null;

    if (time < 0) return "00:00";

    const minutes = Math.trunc(time / MILLISECONDS_IN_MINUTE);
    const seconds = Math.trunc(
      (time - minutes * MILLISECONDS_IN_MINUTE) / MILLISECONDS_IN_SECOND
    );

    const minutesWithZero = getTimeWithZero(minutes);
    const secondsWithZero = getTimeWithZero(seconds);

    return minutesWithZero + ":" + secondsWithZero;
  }, [startPointAt, state, stoppedAt, timerDurationMilliseconds]);
};
