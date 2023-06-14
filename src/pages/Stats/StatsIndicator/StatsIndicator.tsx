import styles from "./statsIndicator.module.css";
import type { TIcons } from "../../../assets/types/TIcons.ts";
import { Heading } from "../../../components/ui/Heading";
import { TextEl } from "../../../components/ui/TextEl";
import { Icon } from "../../../components/ui/Icon/Icon.tsx";
import type { TColorActive } from "../../../assets/types/TColor.ts";
import { getClassName } from "../../../helpers/react/getClassName.ts";
import type { CSSProperties } from "react";

interface IStatsIndicatorProps {
  name: string;
  value: string;
  icon: TIcons;
  color: TColorActive;
  isNoData?: boolean;
}

export const StatsIndicator = ({
  name,
  value,
  icon,
  color,
  isNoData = false,
}: IStatsIndicatorProps) => {
  let indicatorStyles: CSSProperties | undefined;
  let iconStyles: CSSProperties | undefined;
  if (!isNoData) {
    indicatorStyles = { backgroundColor: `var(--${color}-light)` };
    iconStyles = { color: `var(--${color})` };
  }

  return (
    <div
      className={getClassName([styles.indicatorWrapper, isNoData && styles.noData])}
      style={indicatorStyles}
    >
      <div className={styles.indicator}>
        <Icon className={styles.icon} iconName={icon} style={iconStyles}/>
        <Heading as="h2">{name}</Heading>
        <TextEl className={styles.value}>{value}</TextEl>
      </div>
    </div>
  );
};
