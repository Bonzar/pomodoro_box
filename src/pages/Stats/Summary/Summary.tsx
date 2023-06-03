import styles from "./summary.module.css";
import { Heading } from "../../../components/ui/Header";
import { Indent } from "../../../components/ui/Indent";
import { TextEl } from "../../../components/ui/TextEl";
import { formatTime } from "../../../helpers/js/formatTime.ts";

const weekdayDict = {
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
  7: "Воскресенье",
} as const;

interface ISummaryProps {
  weekday: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  focusMinutes: number;
}

export const Summary = ({ weekday, focusMinutes }: ISummaryProps) => {
  return (
    <>
      <Heading as="h2">{weekdayDict[weekday]}</Heading>
      <Indent size={15} />
      <TextEl textLineHeight={28}>
        Вы работали над задачами в течение{" "}
        <TextEl
          textWeight={700}
          textLineHeight={28}
          className={styles.weekDayFocusTime}
        >
          {formatTime(focusMinutes, { genitiveCase: true })}
        </TextEl>
      </TextEl>
    </>
  );
};
