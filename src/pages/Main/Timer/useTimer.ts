import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import {
  addTimeToTimer,
  endTimer,
  resumeTimer,
  selectTimer,
  startTimer,
  stopTimer,
} from "../../../store/timerSlice.ts";
import {
  deleteTask,
  incrementTaskCompletedPomo,
  selectFirstTask,
} from "../../../store/tasksSlice.ts";
import { exhaustiveCheck } from "../../../helpers/js/exhaustiveCheck.ts";
import { getTimeWithZero } from "../../../helpers/js/getTimeWithZero.ts";
import { useCallback, useEffect, useState } from "react";
import { addStatNote } from "../../../store/statsSlice.ts";
import { MILLISECONDS_IN_MINUTE } from "../../../helpers/constants.ts";

export const useTimer = () => {
  const dispatch = useAppDispatch();

  const currentTask = useAppSelector(selectFirstTask);

  const {
    state,
    type: timerType,
    startPointAt,
    stoppedAt,
    runningAt,
    ...timer
  } = useAppSelector(selectTimer);

  const isTypeFocus = timerType === "FOCUS";

  const isTypeFocusAndTaskExist = isTypeFocus && currentTask?.id;

  const timerDurationMilliseconds =
    MILLISECONDS_IN_MINUTE *
    (isTypeFocus ? timer.focusDuration : timer.breakDurationShort);

  const getCurrentTime = useCallback(() => {
    let time;
    switch (state) {
      case "IDLE": {
        time = timerDurationMilliseconds;
        break;
      }
      case "RUN": {
        if (!startPointAt) {
          console.error(
            "Таймер был начат, но время начало не было установлено!"
          );
          break;
        }

        time = startPointAt + timerDurationMilliseconds - Date.now();
        break;
      }
      case "PAUSE": {
        if (!startPointAt) {
          console.error(
            "Таймер был остановлен, но время когда таймер был начат - отсутствует!"
          );
          break;
        } else if (!stoppedAt) {
          console.error(
            "Таймер был остановлен, но время когда таймер был остановлен - отсутствует!"
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

    const timerDate = new Date(time);
    const timeMinutes = getTimeWithZero(timerDate.getMinutes());
    const timeSeconds = getTimeWithZero(timerDate.getSeconds());

    return timeMinutes + ":" + timeSeconds;
  }, [startPointAt, state, stoppedAt, timerDurationMilliseconds]);

  const [timeString, setTimeString] = useState(getCurrentTime());

  const handleLeftButtonClick = () => {
    switch (state) {
      case "IDLE":
        dispatch(startTimer());
        break;
      case "RUN": {
        dispatch(stopTimer());

        if (!runningAt) break;

        const duration = Date.now() - runningAt;

        dispatch(addStatNote({ type: timerType, duration }));
        break;
      }
      case "PAUSE": {
        dispatch(resumeTimer());

        if (!stoppedAt) break;

        const duration = Date.now() - stoppedAt;

        dispatch(addStatNote({ type: "PAUSE", duration }));
        break;
      }
      default:
        exhaustiveCheck(state);
    }
  };

  const handleRightButtonClick = () => {
    switch (state) {
      case "IDLE":
        break;
      case "RUN": {
        dispatch(endTimer());

        if (isTypeFocusAndTaskExist) {
          dispatch(incrementTaskCompletedPomo({ id: currentTask.id }));
        }

        if (isTypeFocus) {
          dispatch(addStatNote({ type: "STOP" }));
        }

        if (!runningAt) return;

        const duration = Date.now() - runningAt;

        dispatch(addStatNote({ type: timerType, duration }));

        break;
      }
      case "PAUSE":
        dispatch(endTimer());

        if (isTypeFocusAndTaskExist) {
          dispatch(deleteTask(currentTask.id));
        }

        if (isTypeFocus) {
          dispatch(addStatNote({ type: "POMO" }));
        }
        break;
      default:
        exhaustiveCheck(state);
    }
  };

  const handleAddTimeButtonClick = () => {
    dispatch(addTimeToTimer());
  };

  // update current time string
  useEffect(() => {
    if (state === "RUN") {
      const interval = setInterval(() => {
        setTimeString(getCurrentTime());

        if (!startPointAt) return;

        const timerExceedAt = startPointAt + timerDurationMilliseconds;

        // Finish the timer when the time is exceeded
        if (timerExceedAt && Date.now() > timerExceedAt) {
          if (isTypeFocus) {
            dispatch(addStatNote({ type: "POMO" }));
          }

          if (runningAt) {
            const duration = timerExceedAt - runningAt;

            dispatch(addStatNote({ type: timerType, duration }));
          }

          dispatch(endTimer());
        }
      }, 100);

      return () => {
        clearInterval(interval);
      };
    } else {
      setTimeString(getCurrentTime());
    }
  }, [
    dispatch,
    getCurrentTime,
    isTypeFocus,
    runningAt,
    startPointAt,
    state,
    timerDurationMilliseconds,
    timerType,
  ]);

  return {
    currentTask,
    timeString,
    handleLeftButtonClick,
    handleAddTimeButtonClick,
    handleRightButtonClick,
    timerState: state,
    timerType: timerType,
  };
};
