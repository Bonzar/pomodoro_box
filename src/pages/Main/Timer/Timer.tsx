import styles from "./timer.module.css";
import { TextEl } from "../../../components/ui/TextEl";
import { Indent } from "../../../components/ui/Indent";
import { Button } from "../../../components/ui/Button";
import { getClassName } from "../../../helpers/react/getClassName.ts";
import { useTimer } from "./useTimer.ts";
import { ButtonCircle } from "../../../components/ui/ButtonCircle";

export const Timer = () => {
  const {
    handleLeftButtonClick,
    handleAddTimeButtonClick,
    handleRightButtonClick,
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
        <TextEl
          as="div"
          textColor="gray-99"
          className={styles.timerTaskDescribe}
        >
          {currentTask && (
            <TextEl>
              Задача - <TextEl textColor="black">{currentTask.title}</TextEl>
            </TextEl>
          )}
          <Indent size={32} />
        </TextEl>

        <div className={styles.actions}>
          <Button
            className={styles.actionsBtn}
            btnColor="green"
            onClick={handleLeftButtonClick}
            btnFilled
          >
            {state === "IDLE" && "Старт"}
            {state === "RUN" && "Пауза"}
            {state === "PAUSE" && "Продолжить"}
          </Button>
          <Button
            className={styles.actionsBtn}
            btnColor="red"
            onClick={handleRightButtonClick}
            disabled={state === "IDLE"}
          >
            {state === "IDLE" && (type === "FOCUS" ? "Стоп" : "Пропустить")}
            {state === "RUN" && (type === "FOCUS" ? "Стоп" : "Пропустить")}
            {state === "PAUSE" && (type === "FOCUS" ? "Сделано" : "Пропустить")}
          </Button>
        </div>

        <ButtonCircle
          btnType="plus"
          className={styles.addButton}
          onClick={handleAddTimeButtonClick}
          disabled={state === "IDLE"}
        />
      </div>
    </div>
  );
};
