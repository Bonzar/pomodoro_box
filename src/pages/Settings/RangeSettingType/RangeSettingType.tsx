import styles from "./rangeSettingType.module.css";
import {
  RANGE_SETTING_DEFAULT_CHANGE_STEP,
  RANGE_SETTING_DEFAULT_MIN_VALUE,
} from "../../../helpers/constants.ts";
import { Heading } from "../../../components/ui/Heading";
import { ButtonCircle } from "../../../components/ui/ButtonCircle";
import { TextEl } from "../../../components/ui/TextEl";

interface IRangeSettingTypeProps {
  settingName: string;
  value: number;
  valueName: string;
  onIncrease: (newValue: number) => void;
  onDecrease: (newValue: number) => void;
  changeStep?: number;
  minValue?: number;
}

export const RangeSettingType = ({
  settingName,
  value,
  valueName,
  changeStep = RANGE_SETTING_DEFAULT_CHANGE_STEP,
  minValue = RANGE_SETTING_DEFAULT_MIN_VALUE,
  onDecrease,
  onIncrease,
}: IRangeSettingTypeProps) => {
  changeStep = Math.abs(changeStep);

  const decreasedValue = value - changeStep;
  const decreaseNewValue =
    decreasedValue > minValue ? decreasedValue : minValue;

  const increaseNewValue =
    value >= changeStep ? value + changeStep : changeStep;

  return (
    <>
      <span className={styles.name}>
        <Heading as={"p"}>{settingName}</Heading>
      </span>

      <ButtonCircle
        className={styles.decreaseBtn}
        btnType="minus"
        aria-label={`Уменьшить значение параметра ${settingName}`}
        onClick={() => onDecrease(decreaseNewValue)}
      />

      <TextEl className={styles.value}>{valueName}</TextEl>

      <ButtonCircle
        btnType="plus"
        className={styles.increaseBtn}
        aria-label={`Увеличить значение параметра ${settingName}`}
        onClick={() => onIncrease(increaseNewValue)}
      />
    </>
  );
};
