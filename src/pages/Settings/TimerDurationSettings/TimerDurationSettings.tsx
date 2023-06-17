import styles from "./timerDurationSettings.module.css";
import type { ListItem } from "../../../components/ui/List";
import { List } from "../../../components/ui/List";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import type { ITimerDurationSettings } from "../../../store/timerSlice.ts";
import { selectTimer, updateSettings } from "../../../store/timerSlice.ts";
import { mergeLeft, pipe } from "ramda";
import { SettingsDivider } from "../SettingsDivider";
import { getMinutesWithName } from "../../../helpers/js/dateAndTime/getMinutesWithName.ts";
import { RangeSettingType } from "../RangeSettingType";

interface ITimerDurationSettingItemProps {
  settingName: string;
  settingsProp: keyof ITimerDurationSettings;
}

const TimerDurationSettingItem = ({
  settingName,
  settingsProp,
}: ITimerDurationSettingItemProps) => {
  const timer = useAppSelector(selectTimer);
  const dispatch = useAppDispatch();

  const getMinutesWithNameAccusativeCase = (minutes: number) =>
    getMinutesWithName(minutes, {
      case: "accusative",
      nameSize: "full",
    });

  return (
    <RangeSettingType
      settingName={settingName}
      valueName={getMinutesWithNameAccusativeCase(timer[settingsProp])}
      value={timer[settingsProp]}
      onDecrease={(newValue) =>
        dispatch(updateSettings({ [settingsProp]: newValue }))
      }
      onIncrease={(newValue) =>
        dispatch(updateSettings({ [settingsProp]: newValue }))
      }
    />
  );
};

const timerSettingsList: ListItem<typeof TimerDurationSettingItem>[] = [
  {
    settingName: "Помидор",
    settingsProp: "focusDuration" as const,
  },
  {
    settingName: "Короткий перерыв",
    settingsProp: "breakDurationShort" as const,
  },
  {
    settingName: "Длинный перерыв",
    settingsProp: "breakDurationLong" as const,
  },
  {
    settingName: "Кнопка добавления времени",
    settingsProp: "addTimeDuration" as const,
  },
].map(
  pipe(mergeLeft({ as: TimerDurationSettingItem }), (item) => ({
    ...item,
    key: item.settingName,
  }))
);

export const TimerDurationSettings = () => {
  return (
    <List
      list={timerSettingsList}
      divider={<SettingsDivider className={styles.divider} />}
    />
  );
};
