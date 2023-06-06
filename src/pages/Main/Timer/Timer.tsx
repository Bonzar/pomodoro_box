import styles from "./timer.module.css";
import { TextEl } from "../../../components/ui/TextEl";
import { Indent } from "../../../components/ui/Indent";
import { Button } from "../../../components/ui/Button";
import { Icon } from "../../../components/ui/Icon/Icon.tsx";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import {
  addTimeToTimer,
  endTimer,
  resumeTimer,
  selectTimer,
  startTimer,
  stopTimer,
} from "../../../store/timerSlice.ts";
import { exhaustiveCheck } from "../../../helpers/js/exhaustiveCheck.ts";
import { useCallback, useEffect, useState } from "react";
import { getTimeWithZero } from "../../../helpers/js/getTimeWithZero.ts";

export const Timer = () => {
  const timer = useAppSelector(selectTimer);
  const dispatch = useAppDispatch();

  const timerDuration =
    timer.type === "FOCUS" ? timer.focusDuration : timer.pauseDurationShort;

  const getCurrentTime = useCallback(() => {
    let time;
    switch (timer.state) {
      case "IDLE": {
        time = timerDuration * 60 * 1000;
        break;
      }
      case "STARTED": {
        if (!timer.startedAt) {
          console.error(
            "Таймер был начат, но время начало не было установлено!"
          );
          break;
        }

        const timerEndsAt = timer.startedAt + timerDuration * 60 * 1000;

        time = timerEndsAt - Date.now();
        break;
      }
      case "STOPPED": {
        if (!timer.startedAt) {
          console.error(
            "Таймер был остановлен, но время когда таймер был начат - отсутствует!"
          );
          break;
        } else if (!timer.stoppedAt) {
          console.error(
            "Таймер был остановлен, но время когда таймер был остановлен - отсутствует!"
          );
          break;
        }

        time = timerDuration * 60 * 1000 - (timer.stoppedAt - timer.startedAt);
        break;
      }
      default:
        exhaustiveCheck(timer.state);
    }

    if (!time) return null;

    if (time < 0) return "00:00";

    const timerDate = new Date(time);
    const timeMinutes = getTimeWithZero(timerDate.getMinutes());
    const timeSeconds = getTimeWithZero(timerDate.getSeconds());

    return timeMinutes + ":" + timeSeconds;
  }, [timer.startedAt, timer.state, timer.stoppedAt, timerDuration]);

  const [timeString, setTimeString] = useState(getCurrentTime());

  const handleLeftButtonClick = () => {
    if (timer.state === "IDLE") {
      dispatch(startTimer());
    } else {
      dispatch(resumeTimer());
    }
  };

  const handleRightButtonClick = () => {
    if (timer.state === "STARTED") {
      dispatch(stopTimer());
      return;
    }

    if (timer.state === "STOPPED") {
      dispatch(endTimer());
    }
  };

  // update current time string
  useEffect(() => {
    if (timer.state === "STARTED") {
      const interval = setInterval(() => {
        setTimeString(getCurrentTime());

        // Finish the timer when the time is exceeded
        if (
          timer.startedAt &&
          Date.now() > timer.startedAt + timerDuration * 60 * 1000
        ) {
          dispatch(endTimer());
        }
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }

    setTimeString(getCurrentTime());
  }, [dispatch, getCurrentTime, timer.startedAt, timer.state, timerDuration]);

  return (
    <div>
      <div className={styles.header}>
        <TextEl textWeight={700} textColor="white">
          Сверстать сайт
        </TextEl>
        <TextEl textColor="white">Помидор 1</TextEl>
      </div>
      <div className={styles.timer}>
        <TextEl textWeight={200} className={styles.timerTime}>
          {!timeString && "Ошибка"}
          {timeString}
          <Indent size={10} />
        </TextEl>
        <div className={styles.timerTaskDescribe}>
          <TextEl textColor="gray-99">
            Задача 1 - <TextEl textColor="black">Сверстать сайт</TextEl>
          </TextEl>
          <Indent size={32} />
        </div>
        <div className={styles.actionsBlock}>
          <div className={styles.actions}>
            <Button btnColor="green" onClick={handleLeftButtonClick}>
              Старт
            </Button>
            <Button
              btnColor="red"
              onClick={handleRightButtonClick}
              disabled={timer.state === "IDLE"}
            >
              Стоп
            </Button>
          </div>
        </div>
        <button
          className={styles.addButton}
          onClick={() => dispatch(addTimeToTimer())}
          disabled={timer.state === "IDLE"}
        >
          <Icon iconName="plus" />
        </button>
      </div>
    </div>
  );
};
