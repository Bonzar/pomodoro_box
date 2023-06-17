import styles from "./settingsDivider.module.css";
import { Indent } from "../../../components/ui/Indent";
import { Divider } from "../../../components/ui/Divider";
import { getClassName } from "../../../helpers/react/getClassName.ts";

interface ISettingsDividerProps {
  className?: string;
}

export const SettingsDivider = ({ className }: ISettingsDividerProps) => (
  <div className={getClassName([styles.divider, className])}>
    <Indent size={19} />
    <Divider dividerColor="gray-C4" />
    <Indent size={19} />
  </div>
);
