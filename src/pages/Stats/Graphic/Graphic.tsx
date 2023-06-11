import styles from "./graphic.module.css";
import { getClassName } from "../../../helpers/react/getClassName.ts";
import { TextEl } from "../../../components/ui/TextEl";
import { List } from "../../../components/ui/List";
import { mergeLeft, objOf, pipe } from "ramda";
import { assocKeyAsChildren } from "../../../helpers/react/assocKeyAsChildren.ts";
import { Divider } from "../../../components/ui/Divider";
import { useAppSelector } from "../../../store/hooks.ts";
import { selectWeekStats } from "../../../store/statsSlice.ts";
import type { WeekShift } from "../WeekChanger";
import { formatTime } from "../../../helpers/js/dateAndTime/formatTime.ts";
import { useMemo } from "react";
import { joinStats } from "../joinStats.ts";
import { selectTimer } from "../../../store/timerSlice.ts";
import type { WeekDayIndex } from "../../../helpers/constants.ts";
import { MILLISECONDS_IN_MINUTE } from "../../../helpers/constants.ts";
import { useWeekdayDict } from "../../../hooks/useWeekdayDict.ts";

const getLegendNamesElements = (legendNames: string[]) => {
  const legendElements = legendNames
    .map(
      pipe(
        objOf("children"),
        mergeLeft({ as: TextEl, textLineHeight: 33, textSize: 12 }),
        assocKeyAsChildren
      )
    )
    .map((item, index) => ({
      ...item,
      style: { gridArea: `legendName-${index + 1}` },
      className: styles.legendName,
    }));

  const legendGridRows = legendElements.map((_, index) => ({
    as: Divider,
    className: getClassName([styles.gridLine, styles[`gridLine-${index + 1}`]]),
    key: legendElements[index].key + "_gridRow",
  }));

  return [...legendElements, ...legendGridRows];
};

interface IGraphicProps {
  selectedWeekDay: WeekDayIndex;
  onSelectWeekDay: (weekDay: WeekDayIndex) => void;
  weekShift: WeekShift;
}

const GRAPHIC_LEGEND_SEGMENTS_COUNT = 5;

export const Graphic = ({
  selectedWeekDay,
  onSelectWeekDay,
  weekShift,
}: IGraphicProps) => {
  const weekStats = useAppSelector((state) =>
    selectWeekStats(state, weekShift)
  );
  const { focusDuration } = useAppSelector(selectTimer);

  const maxStatsValueMilliseconds = Math.max(
    ...weekStats.map((dayStats) => {
      const { focusTime, pauseTime } = joinStats(dayStats);
      return focusTime + pauseTime;
    })
  );

  const getOneGraphicSegmentMinutesMultipleOfFocusDuration = (
    maxStatsValueMilliseconds: number
  ) => {
    const segmentMinutes = Math.round(
      Math.ceil(
        maxStatsValueMilliseconds /
          MILLISECONDS_IN_MINUTE /
          focusDuration /
          GRAPHIC_LEGEND_SEGMENTS_COUNT
      ) * focusDuration
    );

    if (segmentMinutes === 0) {
      return focusDuration;
    }

    return segmentMinutes;
  };

  const oneGraphicSegmentMinutes =
    getOneGraphicSegmentMinutesMultipleOfFocusDuration(
      maxStatsValueMilliseconds
    );

  const legendNames = useMemo(() => {
    const legendNames = [];
    for (
      let legendNameIndex = 1;
      legendNameIndex < GRAPHIC_LEGEND_SEGMENTS_COUNT;
      legendNameIndex++
    ) {
      legendNames.push(
        formatTime(oneGraphicSegmentMinutes * legendNameIndex, {
          timeNameSize: { hours: "short", minutes: "medium" },
        })
      );
    }

    return getLegendNamesElements(legendNames.reverse());
  }, [oneGraphicSegmentMinutes]);

  const weekdaysDict = useWeekdayDict(true);
  const weekDays = useMemo(
    () =>
      Object.values(weekdaysDict)
        .map(
          pipe(
            objOf("children"),
            mergeLeft({ as: TextEl, textLineHeight: 28 }),
            assocKeyAsChildren
          )
        )
        .map((item, index) => ({
          ...item,
          style: { gridArea: `weekday-${index + 1}` },
          className: getClassName([
            styles.weekday,
            index === selectedWeekDay && styles.weekdaySelected,
          ]),
        })),
    [selectedWeekDay, weekdaysDict]
  );

  const graphicColumns = weekDays.map((_, index) => {
    const { focusTime, pauseTime } = joinStats(weekStats[index]);

    const dayStatsTimerDuration = focusTime + pauseTime;

    const columnHeightPercentage = Math.round(
      (dayStatsTimerDuration /
        (oneGraphicSegmentMinutes *
          GRAPHIC_LEGEND_SEGMENTS_COUNT *
          MILLISECONDS_IN_MINUTE)) *
        100
    );

    const columnHeightProp =
      columnHeightPercentage > 0 ? columnHeightPercentage + "%" : undefined;

    return (
      <div
        key={index}
        className={getClassName([
          styles.column,
          index === selectedWeekDay && styles.columnSelected,
          dayStatsTimerDuration === 0 && styles.columnEmpty,
        ])}
        style={{
          gridArea: `column-${index + 1}`,
          height: columnHeightProp,
        }}
        onClick={() => onSelectWeekDay(index as WeekDayIndex)}
      />
    );
  });

  return (
    <div className={styles.graphic}>
      {...graphicColumns}
      <List list={legendNames} />
      <List list={weekDays} />
      <div className={styles.footerBackground} />
    </div>
  );
};
