import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import {
  addTimeToTimer,
  endTimer,
  resumeTimer,
  selectTimer,
  setNotificationPermission,
  startTimer,
  stopTimer,
} from "../../../store/timerSlice.ts";
import {
  incrementTaskCompletedPomo,
  selectFirstTask,
} from "../../../store/tasksSlice.ts";
import { exhaustiveCheck } from "../../../helpers/js/exhaustiveCheck.ts";
import { useCallback, useEffect, useState } from "react";
import { addStatNote, selectTodayStats } from "../../../store/statsSlice.ts";
import {
  MAX_PAUSE_DURATION_FOR_SAVING_STATS,
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_SECOND,
} from "../../../helpers/constants.ts";
import { getTimeWithZero } from "../../../helpers/js/dateAndTime/getTimeWithZero.ts";
import { joinStats } from "../../Stats/joinStats.ts";
import { toast } from "sonner";
import { deleteTaskThank } from "../../../store/deleteTaskThank.ts";
import {
  requestNotificationPermission,
  withNotificationPermission,
} from "../../../helpers/js/notificationApi.ts";
import logoIconSrc from "../../../assets/icons/logo.svg";
import { useNotificationCallback } from "../../../hooks/useNotificationCallback.ts";
import { useDisableNotificationsToast } from "../../../hooks/useDisableNotificationsToast.ts";
import notificationSoundSrc from "../../../assets/sounds/notificationSound.wav";

export const useTimer = () => {
  const dispatch = useAppDispatch();

  const currentTask = useAppSelector(selectFirstTask);

  const {
    state,
    type: timerType,
    longBreakFrequency,
    startPointAt,
    stoppedAt,
    runningAt,
    ...timer
  } = useAppSelector(selectTimer);

  const todayStats = useAppSelector(selectTodayStats);
  const { completedPomo, stopsCount } = joinStats(todayStats);

  const isTypeFocus = timerType === "FOCUS";
  const isLongBreak =
    !isTypeFocus &&
    longBreakFrequency !== 0 &&
    (completedPomo + stopsCount) % longBreakFrequency === 0;

  const isTypeFocusAndTaskExist = isTypeFocus && currentTask?.id;

  const timerDurationMilliseconds =
    MILLISECONDS_IN_MINUTE *
    (isTypeFocus
      ? timer.focusDuration
      : isLongBreak
      ? timer.breakDurationLong
      : timer.breakDurationShort);

  const getCurrentTime = useCallback(() => {
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

  const [timeString, setTimeString] = useState(getCurrentTime());

  const showDisableNotificationsToast = useDisableNotificationsToast();

  const handleLeftButtonClick = () => {
    withNotificationPermission((browserPermission) => {
      switch (browserPermission) {
        case "default":
          requestNotificationPermission((newPermission) => {
            dispatch(setNotificationPermission(newPermission));
          });
          break;
        case "denied":
          if (timer.notificationPermission !== browserPermission) {
            showDisableNotificationsToast();
          }
          break;
        case "granted":
          break;
        default:
          exhaustiveCheck(browserPermission);
      }
    });

    switch (state) {
      case "IDLE":
        dispatch(startTimer());
        break;
      case "RUN": {
        dispatch(stopTimer());

        if (!runningAt) {
          toast.error("Отсутствует время запуска таймера!");
          break;
        }

        const duration = Date.now() - runningAt;

        dispatch(addStatNote({ type: timerType, duration }));
        break;
      }
      case "PAUSE": {
        dispatch(resumeTimer());

        if (!stoppedAt) {
          toast.error("Отсутствует время остановки таймера!");
          break;
        }

        const duration = Date.now() - stoppedAt;

        if (duration <= MAX_PAUSE_DURATION_FOR_SAVING_STATS) {
          dispatch(addStatNote({ type: "PAUSE", duration }));
        }

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

        if (!runningAt) {
          toast.error("Отсутствует время запуска таймера!");
          return;
        }

        const duration = Date.now() - runningAt;

        dispatch(addStatNote({ type: timerType, duration }));

        break;
      }
      case "PAUSE":
        dispatch(endTimer());

        if (isTypeFocusAndTaskExist) {
          dispatch(deleteTaskThank({ id: currentTask.id }));
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

  const showTimerNotification = useNotificationCallback(() => {
    new Audio(notificationSoundSrc).play().catch((error) => {
      if (typeof error === "string") {
        toast.error(error);
      } else {
        console.error(error);
      }
    });

    new Notification("Pomodoro_box", {
      body: isTypeFocus
        ? "Помидор завершен, пора отдохнуть!"
        : "Перерыв завершен, пора поработать!",
      icon: logoIconSrc,
    });
  });

  // update current time string
  useEffect(() => {
    if (state === "RUN") {
      const interval = setInterval(() => {
        setTimeString(getCurrentTime());

        if (!startPointAt) {
          toast.error("Отсутствует стартовая отметка времени таймера!");
          return;
        }

        const timerExceedAt = startPointAt + timerDurationMilliseconds;

        // Finish the timer when the time is exceeded
        if (timerExceedAt && Date.now() > timerExceedAt) {
          if (isTypeFocus) {
            dispatch(addStatNote({ type: "POMO" }));
          }

          if (runningAt) {
            const duration = timerExceedAt - runningAt;

            dispatch(addStatNote({ type: timerType, duration }));
          } else {
            toast.error("Отсутствует время запуска таймера!");
          }

          showTimerNotification();

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
    showTimerNotification,
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
    isLongBreak,
  };
};
