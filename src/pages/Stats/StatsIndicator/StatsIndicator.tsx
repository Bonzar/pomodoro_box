import styles from "./statsIndicator.module.css";
import type { TIcons } from "../../../assets/types/TIcons.ts";
import { Heading } from "../../../components/ui/Header";
import { TextEl } from "../../../components/ui/TextEl";
import { Icon } from "../../../components/ui/Icon/Icon.tsx";
import type { TColorActive } from "../../../assets/types/TColor.ts";

interface IStatsIndicatorProps {
  name: string;
  value: string;
  icon: TIcons;
  color: TColorActive;
}

export const StatsIndicator = ({
  name,
  value,
  icon,
  color,
}: IStatsIndicatorProps) => {
  return (
    <div
      className={styles.indicator}
      style={{ backgroundColor: `var(--${color}-light)` }}
    >
      <Heading as="h2">{name}</Heading>
      <TextEl className={styles.value}>{value}</TextEl>
      <Icon className={styles.icon} iconName={icon} iconColor={color} />
    </div>
  );
};
