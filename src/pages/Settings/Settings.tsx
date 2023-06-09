import styles from "./settings.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import type { ITimerSettings } from "../../store/timerSlice.ts";
import { selectTimer, updateSettings } from "../../store/timerSlice.ts";
import { Indent } from "../../components/ui/Indent";
import { TextEl } from "../../components/ui/TextEl";
import { ButtonCircle } from "../../components/ui/ButtonCircle";
import { Heading } from "../../components/ui/Header";
import { Divider } from "../../components/ui/Divider";

interface ISettingsItemProps {
  name: string;
  value: string;
  settingsProp: keyof ITimerSettings;
  onIncrease?: VoidFunction;
  onDecrease?: VoidFunction;
}

const SETTINGS_CHANGE_STEP = 5;

const SettingsItem = ({ name, value, settingsProp }: ISettingsItemProps) => {
  const timer = useAppSelector(selectTimer);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.parameter}>
      <span className={styles.parameterName}>
        <Heading as={"p"}>{name}</Heading>
      </span>

      <ButtonCircle
        btnType="minus"
        onClick={() =>
          dispatch(
            updateSettings({
              [settingsProp]: timer[settingsProp] - SETTINGS_CHANGE_STEP,
            })
          )
        }
      />

      <TextEl className={styles.value}>{value}</TextEl>

      <ButtonCircle
        btnType="plus"
        onClick={() =>
          dispatch(
            updateSettings({
              [settingsProp]:
                timer[settingsProp] === 1
                  ? SETTINGS_CHANGE_STEP
                  : timer[settingsProp] + SETTINGS_CHANGE_STEP,
            })
          )
        }
      />
    </div>
  );
};

export const Settings = () => {
  const timer = useAppSelector(selectTimer);

  return (
    <div className={styles.settings}>
      <SettingsItem
        name="Сеанс"
        value={`${timer.focusDuration} минут`}
        settingsProp="focusDuration"
      />

      <Indent size={19} />

      <div className={styles.divider}>
        <Divider dividerColor="gray-C4" />
      </div>

      <Indent size={19} />

      <SettingsItem
        name="Короткий перерыв"
        value={`${timer.breakDurationShort} минут`}
        settingsProp="breakDurationShort"
      />

      <Indent size={19} />

      <div className={styles.divider}>
        <Divider dividerColor="gray-C4" />
      </div>

      <Indent size={15} />

      <SettingsItem
        name="Длинный перерыв"
        value={`${timer.breakDurationLong} минут`}
        settingsProp="breakDurationLong"
      />

      <Indent size={19} />

      <div className={styles.divider}>
        <Divider dividerColor="gray-C4" />
      </div>

      <Indent size={15} />

      <SettingsItem
        name="Кнопка добавления времени"
        value={`${timer.addTimeDuration} минут`}
        settingsProp="addTimeDuration"
      />
    </div>
  );
};
