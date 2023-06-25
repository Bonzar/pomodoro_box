import styles from "./timer.module.css";
import { TextEl } from "../../../components/ui/TextEl";
import { Indent } from "../../../components/ui/Indent";
import { LeftTimerButton } from "./LeftTimerButton";
import { RightTimerButton } from "./RightTimerButton";
import { getClassName } from "../../../helpers/react/getClassName.ts";
import { useTimer } from "./hooks/useTimer.ts";
import { AddTimeButton } from "./AddTimeButton/AddTimeButton.tsx";

export const Timer = () => {
  const {
    timeString,
    currentTask,
    timerType: type,
    timerState: state,
    isLongBreak,
  } = useTimer();

  return (
    <div>
      <div
        className={getClassName([
          styles.header,
          state !== "IDLE" &&
            (type === "FOCUS" ? styles.headerFocus : styles.headerBreak),
        ])}
      >
        <TextEl
          className={styles.header__taskName}
          textWeight={700}
          textColor="white"
        >
          {currentTask?.title}
        </TextEl>

        <TextEl className={styles.header__pomoCounter} textColor="white">
          {type === "FOCUS" ? (
            <TextEl>
              Помидор
              {currentTask && <TextEl> {currentTask.completedPomo + 1}</TextEl>}
            </TextEl>
          ) : !isLongBreak ? (
            "Перерыв"
          ) : (
            "Длинный перерыв"
          )}
        </TextEl>
      </div>

      <div className={styles.timer}>
        <TextEl
          textWeight={200}
          className={styles.timerTime}
          textColor={
            state !== "RUN" ? "black" : type === "FOCUS" ? "red" : "green"
          }
        >
          {timeString ? timeString : "Ошибка"}
          <Indent size={10} />
        </TextEl>
        <TextEl as="div" className={styles.timerTaskDescribe}>
          {currentTask && (
            <TextEl>
              Задача - <TextEl textColor="black">{currentTask.title}</TextEl>
            </TextEl>
          )}
          <Indent size={32} />
        </TextEl>

        <div className={styles.actions}>
          <LeftTimerButton className={styles.actionsBtn} state={state} />
          <RightTimerButton className={styles.actionsBtn} state={state} />
        </div>

        <AddTimeButton
          className={styles.addButton}
          disabled={state === "IDLE"}
        />
      </div>
    </div>
  );
};
