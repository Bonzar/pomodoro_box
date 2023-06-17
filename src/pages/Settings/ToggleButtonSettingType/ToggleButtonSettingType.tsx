import styles from "./toggleButtonSettingType.module.css";
import { Button } from "../../../components/ui/Button";
import type { MouseEvent, PropsWithChildren } from "react";

interface IToggleButtonSettingTypeProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const ToggleButtonSettingType = ({
  children,
  onClick,
}: PropsWithChildren<IToggleButtonSettingTypeProps>) => {
  return (
    <Button
      className={styles.toggleButtonSetting}
      btnColor="red"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
