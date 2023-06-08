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

export const useTimer = () => {
  const dispatch = useAppDispatch();

  const { state, type, startPointAt, stoppedAt, startRunningAt, ...timer } =
    useAppSelector(selectTimer);

  const isTypeFocus = type === "FOCUS";

  const currentTask = useAppSelector(selectFirstTask);

  const timerDuration = isTypeFocus
    ? timer.focusDuration
    : timer.breakDurationShort;

  const isTypeFocusAndTaskExist = isTypeFocus && currentTask?.id;

  const getCurrentTime = useCallback(() => {
    let time;
    switch (state) {
      case "IDLE": {
        time = timerDuration * 60 * 1000;
        break;
      }
      case "RUN": {
        if (!startPointAt) {
          console.error(
            "Таймер был начат, но время начало не было установлено!"
          );
          break;
        }

        const timerEndsAt = startPointAt + timerDuration * 60 * 1000;

        time = timerEndsAt - Date.now();
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

        time = timerDuration * 60 * 1000 - (stoppedAt - startPointAt);
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
  }, [startPointAt, state, stoppedAt, timerDuration]);

  const [timeString, setTimeString] = useState(getCurrentTime());

  const handleLeftButtonClick = () => {
    switch (state) {
      case "IDLE":
        dispatch(startTimer());
        break;
      case "RUN": {
        dispatch(stopTimer());

        const lastTimerActivePeriodStartPoint = startRunningAt ?? startPointAt;

        if (!lastTimerActivePeriodStartPoint) break;

        const passedMilliseconds = Date.now() - lastTimerActivePeriodStartPoint;

        dispatch(
          addStatNote({
            type: isTypeFocus ? "TIMER_FOCUS" : "TIMER_BREAK",
            milliseconds: passedMilliseconds,
          })
        );
        break;
      }
      case "PAUSE": {
        dispatch(resumeTimer());

        if (!stoppedAt) break;

        const passedMilliseconds = Date.now() - stoppedAt;

        dispatch(
          addStatNote({ type: "PAUSE", milliseconds: passedMilliseconds })
        );
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

        const lastTimerActivePeriodStartPoint = startRunningAt ?? startPointAt;
        if (!lastTimerActivePeriodStartPoint) return;

        const passedMilliseconds = Date.now() - lastTimerActivePeriodStartPoint;

        dispatch(
          addStatNote({
            type: isTypeFocus ? "TIMER_FOCUS" : "TIMER_BREAK",
            milliseconds: passedMilliseconds,
          })
        );

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

        const timerExceedAt =
          startPointAt && startPointAt + timerDuration * 60 * 1000;

        // Finish the timer when the time is exceeded
        if (timerExceedAt && Date.now() > timerExceedAt) {
          if (isTypeFocus) {
            dispatch(addStatNote({ type: "POMO" }));
          }

          const lastTimerActivePeriodStartPoint =
            startRunningAt ?? startPointAt;
          if (!lastTimerActivePeriodStartPoint) return;

          const passedMilliseconds =
            timerExceedAt - lastTimerActivePeriodStartPoint;

          dispatch(
            addStatNote({
              type: isTypeFocus ? "TIMER_FOCUS" : "TIMER_BREAK",
              milliseconds: passedMilliseconds,
            })
          );

          dispatch(endTimer());
        }
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }

    setTimeString(getCurrentTime());
  }, [
    dispatch,
    getCurrentTime,
    isTypeFocus,
    startRunningAt,
    startPointAt,
    state,
    timerDuration,
  ]);

  return {
    currentTask,
    timeString,
    handleLeftButtonClick,
    handleAddTimeButtonClick,
    handleRightButtonClick,
    timerState: state,
    timerType: type,
  };
};
