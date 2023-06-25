import { useAppDispatch, useAppSelector } from "../../../../store/hooks.ts";
import { selectFirstTask } from "../../../../store/tasksSlice.ts";
import { endTimer, selectTimer } from "../../../../store/timerSlice.ts";
import { useIsLongBreak } from "./useIsLongBreak.ts";
import { useTimerDuration } from "./useTimerDuration.ts";
import { useGetCurrentTimerTime } from "./useGetCurrentTimerTime.ts";
import { useEffect, useState } from "react";
import { useNotificationCallback } from "../../../../hooks/useNotificationCallback.ts";
import { addStatNote } from "../../../../store/statsSlice.ts";
import { toast } from "sonner";
import logoIconSrc from "../../../../assets/icons/logo.svg";
import notificationSoundSrc from "../../../../assets/sounds/notificationSound.wav";

export const useTimer = () => {
  const dispatch = useAppDispatch();

  const currentTask = useAppSelector(selectFirstTask);

  const {
    state,
    type: timerType,
    startPointAt,
    runningAt,
  } = useAppSelector(selectTimer);

  const isTypeFocus = timerType === "FOCUS";
  const isLongBreak = useIsLongBreak();

  const timerDurationMilliseconds = useTimerDuration();

  const getCurrentTime = useGetCurrentTimerTime();
  const [timeString, setTimeString] = useState(getCurrentTime());

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
    if (state !== "RUN") {
      setTimeString(getCurrentTime());
    } else {
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
    timerState: state,
    timerType,
    isLongBreak,
  };
};
