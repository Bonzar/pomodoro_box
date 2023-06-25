import { Button } from "../../../../components/ui/Button";
import type { ITimer } from "../../../../store/timerSlice.ts";
import {
  resumeTimer,
  selectTimer,
  startTimer,
  stopTimer,
} from "../../../../store/timerSlice.ts";
import { useRequestNotificationPermission } from "../../../../hooks/useRequestNotificationPermission.ts";
import { addStatNote } from "../../../../store/statsSlice.ts";
import { MAX_PAUSE_DURATION_FOR_SAVING_STATS } from "../../../../helpers/constants.ts";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks.ts";

const stateToButtonTextMap: Record<ITimer["state"], string> = {
  IDLE: "Старт",
  RUN: "Пауза",
  PAUSE: "Продолжить",
};

interface ILeftTimerButtonProps {
  className: string;
  state: ITimer["state"];
}

export const LeftTimerButton = ({
  className,
  state,
}: ILeftTimerButtonProps) => {
  const requestNotificationPermission = useRequestNotificationPermission();
  const dispatch = useAppDispatch();
  const { type: timerType, stoppedAt, runningAt } = useAppSelector(selectTimer);

  const handleStart = () => {
    dispatch(startTimer());
  };

  const handlePause = () => {
    dispatch(stopTimer());

    if (!runningAt) {
      toast.error("Отсутствует время запуска таймера!");
      return;
    }

    const duration = Date.now() - runningAt;

    dispatch(addStatNote({ type: timerType, duration }));
  };

  const handleResume = () => {
    dispatch(resumeTimer());

    if (!stoppedAt) {
      toast.error("Отсутствует время остановки таймера!");
      return;
    }

    const duration = Date.now() - stoppedAt;

    if (duration <= MAX_PAUSE_DURATION_FOR_SAVING_STATS) {
      dispatch(addStatNote({ type: "PAUSE", duration }));
    }
  };

  const stateToActionMap: Record<ITimer["state"], VoidFunction> = {
    IDLE: handleStart,
    RUN: handlePause,
    PAUSE: handleResume,
  };

  const handleLeftButtonClick = () => {
    requestNotificationPermission();

    stateToActionMap[state]();
  };

  return (
    <Button
      className={className}
      btnColor="green"
      onClick={handleLeftButtonClick}
      btnFilled
    >
      {stateToButtonTextMap[state]}
    </Button>
  );
};
