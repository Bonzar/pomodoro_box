import { selectTimer, updateSettings } from "../../../store/timerSlice.ts";
import { RangeSettingType } from "../RangeSettingType";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { declensionByNum } from "../../../helpers/js/declensionByNum.ts";

export const LongBreakFrequencySetting = () => {
  const dispatch = useAppDispatch();
  const { longBreakFrequency } = useAppSelector(selectTimer);

  let valueName: string;
  if (longBreakFrequency === 0) {
    valueName = "Отключен";
  } else if (longBreakFrequency === 1) {
    valueName = "Каждый раз";
  } else {
    valueName = `Раз в ${longBreakFrequency} ${declensionByNum([
      "перерыв",
      "перерыва",
      "перерывов",
    ])(longBreakFrequency)}`;
  }

  return (
    <RangeSettingType
      settingName={"Частота длинного перерыва"}
      value={longBreakFrequency}
      valueName={valueName}
      onIncrease={(newValue) =>
        dispatch(updateSettings({ longBreakFrequency: newValue }))
      }
      onDecrease={(newValue) =>
        dispatch(updateSettings({ longBreakFrequency: newValue }))
      }
      changeStep={1}
      minValue={0}
    />
  );
};
