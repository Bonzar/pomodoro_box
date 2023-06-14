import styles from "./statsIndicator.module.css";
import type { TIcons } from "../../../assets/types/TIcons.ts";
import { Heading } from "../../../components/ui/Heading";
import { TextEl } from "../../../components/ui/TextEl";
import { Icon } from "../../../components/ui/Icon/Icon.tsx";
import type { TColorActive } from "../../../assets/types/TColor.ts";

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
  return (
    <div
      className={styles.indicatorWrapper}
      style={{
        backgroundColor: isNoData ? `var(--gray-F4)` : `var(--${color}-light)`,
      }}
    >
      <div className={styles.indicator}>
        <Icon
          className={styles.icon}
          iconName={icon}
          iconColor={isNoData ? "gray-C4" : color}
        />
        <Heading as="h2">{name}</Heading>
        <TextEl className={styles.value}>{value}</TextEl>
      </div>
    </div>
  );
};
