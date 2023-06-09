import styles from "./settings.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import type { ITimerSettings } from "../../store/timerSlice.ts";
import { selectTimer, updateSettings } from "../../store/timerSlice.ts";
import { Indent } from "../../components/ui/Indent";
import { TextEl } from "../../components/ui/TextEl";
import { ButtonCircle } from "../../components/ui/ButtonCircle";
import { Heading } from "../../components/ui/Header";
import { Divider } from "../../components/ui/Divider";
import type { ListItem } from "../../components/ui/List";
import { List } from "../../components/ui/List";
import { useMemo } from "react";
import { mergeLeft, pipe } from "ramda";
import {
  SETTINGS_CHANGE_STEP,
  SETTINGS_MIN_VALUE,
} from "../../helpers/constants.ts";
import { Button } from "../../components/ui/Button";
import {
  selectInstructionsVisibility,
  toggleInstructionsVisibility,
} from "../../store/tasksSlice.ts";

interface ISettingsItemProps {
  name: string;
  value: string;
  settingsProp: keyof ITimerSettings;
  onIncrease?: VoidFunction;
  onDecrease?: VoidFunction;
}

const TimerSettingsItem = ({
  name,
  value,
  settingsProp,
}: ISettingsItemProps) => {
  const timer = useAppSelector(selectTimer);
  const dispatch = useAppDispatch();

  const decreaseNewValue = timer[settingsProp] - SETTINGS_CHANGE_STEP;

  const increaseNewValue =
    timer[settingsProp] === SETTINGS_MIN_VALUE
      ? SETTINGS_CHANGE_STEP
      : timer[settingsProp] + SETTINGS_CHANGE_STEP;

  return (
    <div className={styles.parameter}>
      <span className={styles.parameterName}>
        <Heading as={"p"}>{name}</Heading>
      </span>

      <ButtonCircle
        btnType="minus"
        aria-label={`Уменьшить значение параметра ${name}`}
        onClick={() =>
          dispatch(updateSettings({ [settingsProp]: decreaseNewValue }))
        }
      />

      <TextEl className={styles.value}>{value}</TextEl>

      <ButtonCircle
        btnType="plus"
        aria-label={`Увеличить значение параметра ${name}`}
        onClick={() =>
          dispatch(updateSettings({ [settingsProp]: increaseNewValue }))
        }
      />
    </div>
  );
};

export const Settings = () => {
  const dispatch = useAppDispatch();

  const {
    focusDuration,
    breakDurationShort,
    breakDurationLong,
    addTimeDuration,
  } = useAppSelector(selectTimer);

  const instructionsVisible = useAppSelector(selectInstructionsVisibility);

  const timerSettingsList: ListItem<typeof TimerSettingsItem>[] = useMemo(
    () =>
      [
        {
          name: "Сеанс",
          value: `${focusDuration} минут`,
          settingsProp: "focusDuration" as const,
        },
        {
          name: "Короткий перерыв",
          value: `${breakDurationShort} минут`,
          settingsProp: "breakDurationShort" as const,
        },
        {
          name: "Длинный перерыв",
          value: `${breakDurationLong} минут`,
          settingsProp: "breakDurationLong" as const,
        },
        {
          name: "Кнопка добавления времени",
          value: `${addTimeDuration} минут`,
          settingsProp: "addTimeDuration" as const,
        },
      ].map(
        pipe(mergeLeft({ as: TimerSettingsItem }), (item) => ({
          ...item,
          key: item.name,
        }))
      ),
    [addTimeDuration, breakDurationLong, breakDurationShort, focusDuration]
  );

  const divider = (
    <>
      <Indent size={19} />
      <div className={styles.divider}>
        <Divider dividerColor="gray-C4" />
      </div>
      <Indent size={15} />
    </>
  );

  return (
    <div className={styles.settings}>
      <List list={timerSettingsList} divider={divider} />
      {divider}
      <Button
        className={styles.instructionsSetting}
        btnColor="red"
        onClick={() => dispatch(toggleInstructionsVisibility())}
      >
        {instructionsVisible ? "Скрыть инструкции" : "Показать инструкции"}
      </Button>
    </div>
  );
};
