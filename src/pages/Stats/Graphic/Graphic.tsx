import styles from "./graphic.module.css";
import { getClassName } from "../../../helpers/react/getClassName.ts";
import { TextEl } from "../../../components/ui/TextEl";
import { List } from "../../../components/ui/List";
import { mergeLeft, objOf, pipe } from "ramda";
import { assocKeyAsChildren } from "../../../helpers/react/assocKeyAsChildren.ts";
import { Divider } from "../../../components/ui/Divider";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
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
    className: styles.weekday,
  }));

const graphicColumns = weekDays.map((_, index) => (
  <div
    key={index}
    className={getClassName([styles.column])}
    style={{ gridArea: `column-${index + 1}` }}
  />
));

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

export const Graphic = () => {
  const legendNames = getLegendNamesElements([
    "1 ч 40 мин",
    "1 ч 15 мин",
    "50 мин",
    "25 мин",
  ]);

  return (
    <div className={styles.graphic}>
      {...graphicColumns}
      <List list={legendNames} />
      <List list={weekDays} />
      <div className={styles.footerBackground} />
    </div>
  );
};
