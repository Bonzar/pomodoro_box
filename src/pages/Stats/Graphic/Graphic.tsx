import styles from "./graphic.module.css";
import { getClassName } from "../../../helpers/react/getClassName.ts";
import { TextEl } from "../../../components/ui/TextEl";
import { List } from "../../../components/ui/List";
import { mergeLeft, objOf, pipe } from "ramda";
import { assocKeyAsChildren } from "../../../helpers/react/assocKeyAsChildren.ts";
import { useAppSelector } from "../../../store/hooks.ts";
import { selectWeekStats } from "../../../store/statsSlice.ts";
import type { WeekShift } from "../WeekChanger";
import { formatTime } from "../../../helpers/js/dateAndTime/formatTime.ts";
import { useMemo } from "react";
import { joinStats } from "../joinStats.ts";
import { selectTimer } from "../../../store/timerSlice.ts";
import type { WeekDayIndex } from "../../../helpers/constants.ts";
import {
  GRAPHIC_LEGEND_SEGMENTS_COUNT,
  MILLISECONDS_IN_MINUTE,
} from "../../../helpers/constants.ts";
import { useWeekdayDict } from "../../../hooks/useWeekdayDict.ts";
import AnimateHeight from "react-animate-height";
import { getOneGraphicSegmentMinutesMultipleOfFocusDuration } from "./getOneGraphicSegmentMinutesMultipleOfFocusDuration.ts";
import { Divider } from "../../../components/ui/Divider";
import { getRangeFromNumber } from "../../../helpers/js/getRangeFromNumber.ts";

const getLegendNamesElements = (oneGraphicSegmentMinutes: number) => {
  const legendNames = [];
  const legendNamesMobile = [];
  for (
    let legendNameIndex = GRAPHIC_LEGEND_SEGMENTS_COUNT - 1;
    legendNameIndex > 0;
    legendNameIndex--
  ) {
    legendNames.push(
      formatTime(oneGraphicSegmentMinutes * legendNameIndex, {
        nameSize: { hours: "short", minutes: "medium" },
      })
    );
    legendNamesMobile.push(
      formatTime(oneGraphicSegmentMinutes * legendNameIndex, {
        nameSize: "short-no-space",
      })
    );
  }

  const getLegendNameElements = (legendNames: string[]) =>
    legendNames
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
      }));

  const legendNameElements = getLegendNameElements(legendNames).map((item) => ({
    ...item,
    className: styles.legendName,
  }));
  const legendNameElementsMobile = getLegendNameElements(legendNamesMobile).map(
    (item) => ({
      ...item,
      className: styles.legendNameMobile,
    })
  );

  return [...legendNameElements, ...legendNameElementsMobile];
};

interface IGraphicProps {
  selectedWeekDay: WeekDayIndex;
  onSelectWeekDay: (weekDay: WeekDayIndex) => void;
  weekShift: WeekShift;
}

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
      const { focusTime, breakTime } = joinStats(dayStats);

      return focusTime + breakTime;
    })
  );

  const oneGraphicSegmentMinutes =
    getOneGraphicSegmentMinutesMultipleOfFocusDuration(
      maxStatsValueMilliseconds,
      focusDuration
    );

  const legendNames = useMemo(() => {
    return getLegendNamesElements(oneGraphicSegmentMinutes);
  }, [oneGraphicSegmentMinutes]);

  const legendGridRows = getRangeFromNumber(
    GRAPHIC_LEGEND_SEGMENTS_COUNT - 1
  ).map((_, index) => ({
    as: Divider,
    className: getClassName([styles.gridLine, styles[`gridLine-${index + 1}`]]),
    key: legendNames[index].key + "_gridRow",
  }));

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
          onClick: () => onSelectWeekDay(index as WeekDayIndex),
        })),
    [onSelectWeekDay, selectedWeekDay, weekdaysDict]
  );

  const graphicColumns = weekDays.map((_, index) => {
    const { focusTime, breakTime } = joinStats(weekStats[index]);

    const dayStatsTimerDuration = focusTime + breakTime;

    const columnHeightPercentage = Math.round(
      (dayStatsTimerDuration /
        (oneGraphicSegmentMinutes *
          GRAPHIC_LEGEND_SEGMENTS_COUNT *
          MILLISECONDS_IN_MINUTE)) *
        100
    );

    return (
      <AnimateHeight
        height={columnHeightPercentage > 0 ? `${columnHeightPercentage}%` : 5}
        style={{ gridArea: `column-${index + 1}` }}
        className={getClassName([
          styles.column,
          index === selectedWeekDay && styles.columnSelected,
          dayStatsTimerDuration === 0 && styles.columnEmpty,
        ])}
        onClick={() => onSelectWeekDay(index as WeekDayIndex)}
      />
    );
  });

  return (
    <div className={styles.graphic}>
      <List list={legendNames} />
      <List list={legendGridRows} />
      {...graphicColumns}
      <div className={styles.footerBackground} />
      <List list={weekDays} />
    </div>
  );
};
