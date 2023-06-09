import styles from "./summary.module.css";
import { Heading } from "../../../components/ui/Heading";
import { Indent } from "../../../components/ui/Indent";
import { TextEl } from "../../../components/ui/TextEl";
import { formatTime } from "../../../helpers/js/dateAndTime/formatTime.ts";
import type { WeekDayIndex } from "../../../helpers/constants.ts";
import { useWeekdayDict } from "../../../hooks/useWeekdayDict.ts";

interface ISummaryProps {
  weekday: WeekDayIndex;
  focusMinutes: number;
  breakMinutes: number;
  isNoData?: boolean;
}

export const Summary = ({
  weekday,
  focusMinutes,
  breakMinutes,
  isNoData = false,
}: ISummaryProps) => {
  const weekdayDict = useWeekdayDict();

  return (
    <>
      <Heading as="h2">{weekdayDict[weekday]}</Heading>
      <Indent size={15} />
      <TextEl textLineHeight={28}>
        {isNoData && "Нет данных"}
        {!isNoData && (
          <>
            <TextEl>
              Вы работали над задачами в течение{" "}
              <TextEl
                textWeight={700}
                textLineHeight={28}
                className={styles.weekDayFocusTime}
              >
                {formatTime(focusMinutes, { case: "genitive" })}
              </TextEl>
              ,{" "}
            </TextEl>
            <TextEl>
              за это время вы отдохнули{" "}
              <TextEl
                textWeight={700}
                textLineHeight={28}
                className={styles.weekDayFocusTime}
              >
                {formatTime(breakMinutes, { case: "accusative" })}
              </TextEl>
            </TextEl>
          </>
        )}
      </TextEl>
    </>
  );
};
