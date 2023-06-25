import { Button } from "../../../../components/ui/Button";
import type { ITimer } from "../../../../store/timerSlice.ts";
import { endTimer, selectTimer } from "../../../../store/timerSlice.ts";
import {
  incrementTaskCompletedPomo,
  selectFirstTask,
} from "../../../../store/tasksSlice.ts";
import { addStatNote } from "../../../../store/statsSlice.ts";
import { deleteTaskThank } from "../../../../store/deleteTaskThank.ts";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks.ts";
import { toast } from "sonner";

interface IRightTimerButtonProps {
  className: string;
  state: ITimer["state"];
}

const stateToButtonTextMap: Record<ITimer["state"], string> = {
  IDLE: "Стоп",
  RUN: "Стоп",
  PAUSE: "Сделано",
};

export const RightTimerButton = ({
  className,
  state,
}: IRightTimerButtonProps) => {
  const dispatch = useAppDispatch();
  const currentTask = useAppSelector(selectFirstTask);
  const { type: timerType, runningAt } = useAppSelector(selectTimer);

  const isTypeFocus = timerType === "FOCUS";

  const isTypeFocusAndTaskExist = isTypeFocus && currentTask?.id;

  const handleCompleteTimer = () => {
    dispatch(endTimer());

    if (isTypeFocusAndTaskExist) {
      dispatch(deleteTaskThank({ id: currentTask.id }));
    }

    if (isTypeFocus) {
      dispatch(addStatNote({ type: "POMO" }));
    }
  };

  const handleAbandonTimer = () => {
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
  };

  const stateToActionMap: Record<
    Exclude<ITimer["state"], "IDLE">,
    VoidFunction
  > = {
    RUN: handleAbandonTimer,
    PAUSE: handleCompleteTimer,
  };

  const handleRightButtonClick = () => {
    if (state === "IDLE") {
      return;
    }

    stateToActionMap[state]();
  };

  return (
    <Button
      className={className}
      btnColor="red"
      onClick={handleRightButtonClick}
      disabled={state === "IDLE"}
    >
      {!isTypeFocus ? "Пропустить" : stateToButtonTextMap[state]}
    </Button>
  );
};
