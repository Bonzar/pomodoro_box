import { ButtonCircle } from "../../../../components/ui/ButtonCircle";
import { addTimeToTimer } from "../../../../store/timerSlice.ts";
import { useAppDispatch } from "../../../../store/hooks.ts";

interface IAddTimeButtonProps {
  className: string;
  disabled: boolean;
}

export const AddTimeButton = ({ className, disabled }: IAddTimeButtonProps) => {
  const dispatch = useAppDispatch();

  const handleAddTimeButtonClick = () => {
    dispatch(addTimeToTimer());
  };

  return (
    <ButtonCircle
      aria-label="Добавить время к таймеру"
      btnType="plus"
      className={className}
      onClick={handleAddTimeButtonClick}
      disabled={disabled}
    />
  );
};
