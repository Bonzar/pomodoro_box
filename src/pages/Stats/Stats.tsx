import { Heading } from "../../components/ui/Heading";
import styles from "./stats.module.css";
import { Summary } from "./Summary";
import { StatsIndicator } from "./StatsIndicator";
import { Graphic } from "./Graphic";
import { PomoCount } from "./PomoCount";
import type { WeekShift } from "./WeekChanger";
import { WeekChanger } from "./WeekChanger";
import { useAppSelector } from "../../store/hooks.ts";
import { selectWeekStats } from "../../store/statsSlice.ts";
import { useMemo, useState } from "react";
import { joinStats } from "./joinStats.ts";
import { useTodayWeekdayIndex } from "../../hooks/useTodayWeekdayIndex.ts";
import { MILLISECONDS_IN_MINUTE } from "../../helpers/constants.ts";
import { formatTime } from "../../helpers/js/dateAndTime/formatTime.ts";

export const Stats = () => {
  const [weekShift, setWeekShift] = useState<WeekShift>(0);

  const todayWeekDayIndex = useTodayWeekdayIndex();
  const [weekDaySelected, setWeekDaySelected] = useState(todayWeekDayIndex);

  const weekStats = useAppSelector((state) =>
    selectWeekStats(state, weekShift)
  );

  const { completedPomo, focusTime, breakTime, pauseTime, stopsCount } =
    useMemo(() => {
      const selectedDayStats = weekStats[weekDaySelected];

      return joinStats(selectedDayStats);
    }, [weekStats, weekDaySelected]);

  const focusStat =
    focusTime + breakTime > 0
      ? Math.round((focusTime / (focusTime + breakTime)) * 100)
      : 0;

  const isNoData = [
    completedPomo,
    focusTime,
    breakTime,
    pauseTime,
    stopsCount,
  ].every((stat) => stat === 0);

  return (
    <div className={styles.stats}>
      <div className={styles.header}>
        <Heading as="h1">Ваша активность</Heading>
        <WeekChanger
          currentWeekShift={weekShift}
          onWeekShiftChange={setWeekShift}
        />
      </div>
      <div className={styles.summary}>
        <Summary
          weekday={weekDaySelected}
          focusMinutes={Math.round(focusTime / MILLISECONDS_IN_MINUTE)}
          isNoData={isNoData}
        />
      </div>
      <div className={styles.pomoCount}>
        <PomoCount count={completedPomo} isNoData={isNoData} />
      </div>
      <div className={styles.graphic}>
        <Graphic
          selectedWeekDay={weekDaySelected}
          onSelectWeekDay={setWeekDaySelected}
          weekShift={weekShift}
        />
      </div>
      <div className={styles.statFocus}>
        <StatsIndicator
          name="Фокус"
          value={focusStat + "%"}
          color="orange"
          icon="focusStat"
          isNoData={isNoData}
        />
      </div>
      <div className={styles.statPause}>
        <StatsIndicator
          name="Время на паузе"
          value={formatTime(Math.round(pauseTime / MILLISECONDS_IN_MINUTE), {
            timeNameSize: "short-no-space",
          })}
          color="lavender"
          icon="pauseStat"
          isNoData={isNoData}
        />
      </div>
      <div className={styles.statStop}>
        <StatsIndicator
          name="Остановки"
          value={stopsCount.toString()}
          color="blue"
          icon="stopsStat"
          isNoData={isNoData}
        />
      </div>
    </div>
  );
};
