import { ToggleButtonSettingType } from "../ToggleButtonSettingType";
import {
  selectInstructionsVisibility,
  toggleInstructionsVisibility,
} from "../../../store/tasksSlice.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";

export const InstructionsVisibilitySetting = () => {
  const dispatch = useAppDispatch();
  const instructionsVisible = useAppSelector(selectInstructionsVisibility);

  return (
    <ToggleButtonSettingType
      onClick={() => dispatch(toggleInstructionsVisibility())}
    >
      {instructionsVisible ? "Скрыть инструкции" : "Показать инструкции"}
    </ToggleButtonSettingType>
  );
};
