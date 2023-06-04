import { Heading } from "../../components/ui/Header";
import styles from "./stats.module.css";
import { Summary } from "./Summary";
import { StatsIndicator } from "./StatsIndicator";
import { Graphic } from "./Graphic";
import { PomoCount } from "./PomoCount";
import { WeekChanger } from "./WeekChanger";

export const Stats = () => (
  <div className={styles.stats}>
    <div className={styles.header}>
      <Heading as="h1">Ваша активность</Heading>
      <WeekChanger />
    </div>
    <div className={styles.summary}>
      <Summary weekday={1} focusMinutes={1245} />
    </div>
    <div className={styles.pomoCount}>
      <PomoCount count={1} />
    </div>
    <div className={styles.graphic}>
      <Graphic />
    </div>
    <div className={styles.statFocus}>
      <StatsIndicator
        name="Фокус"
        value="35%"
        color="orange"
        icon="focusStat"
      />
    </div>
    <div className={styles.statPause}>
      <StatsIndicator
        name="Время на паузе"
        value="12м"
        color="lavender"
        icon="pauseStat"
      />
    </div>
    <div className={styles.statStop}>
      <StatsIndicator
        name="Остановки"
        value="3"
        color="blue"
        icon="stopsStat"
      />
    </div>
  </div>
);
