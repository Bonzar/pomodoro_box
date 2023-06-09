import styles from "./summary.module.css";
import { Heading } from "../../../components/ui/Header";
import { Indent } from "../../../components/ui/Indent";
import { TextEl } from "../../../components/ui/TextEl";
import { formatTime } from "../../../helpers/js/formatTime.ts";

import type { WeekDayIndex } from "../../../helpers/constants.ts";
import { WEEKDAY_DICT } from "../../../helpers/constants.ts";

interface ISummaryProps {
  weekday: WeekDayIndex;
  focusMinutes: number;
}

export const Summary = ({ weekday, focusMinutes }: ISummaryProps) => (
  <>
    <Heading as="h2">{WEEKDAY_DICT[weekday]}</Heading>
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
