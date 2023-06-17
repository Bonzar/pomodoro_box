import { ToggleButtonSettingType } from "../ToggleButtonSettingType";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import {
  selectIsSundayFirstWeekday,
  toggleWeekdayStart,
} from "../../../store/statsSlice.ts";

export const WeekdayStartSetting = () => {
  const dispatch = useAppDispatch();

  const isWeekdayStartOnSunday = useAppSelector(selectIsSundayFirstWeekday);

  return (
    <ToggleButtonSettingType onClick={() => dispatch(toggleWeekdayStart())}>
      {isWeekdayStartOnSunday
        ? "Начинать неделю с понедельника"
        : "Начинать неделю с воскресенья"}
    </ToggleButtonSettingType>
  );
};
