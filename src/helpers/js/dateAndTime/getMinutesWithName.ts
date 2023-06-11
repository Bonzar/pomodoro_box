import { declensionByNum } from "../declensionByNum.ts";
import { exhaustiveCheck } from "../exhaustiveCheck.ts";
import type { FormatTimeOptions, TextCasesDict } from "./formatTime.ts";

const casesOfMinute: TextCasesDict = {
  nominative: ["минута", "минуты", "минут"],
  genitive: ["минуты", "минут"],
  dative: ["минуте", "минутам"],
  accusative: ["минуту", "минуты", "минут"],
  creative: ["минутой(ою)", "минутами"],
  prepositional: ["минуте", "минутах"],
};

export const getMinutesWithName = (
  minutes: number,
  options: FormatTimeOptions
) => {
  const getMinutesDeclensionByNum = declensionByNum(
    casesOfMinute[options.case]
  );

  const minutesNameSize =
    typeof options.nameSize === "object"
      ? options.nameSize.minutes
      : options.nameSize;

  let minutesText: string;
  switch (minutesNameSize) {
    case "full":
      minutesText = `${minutes} ${getMinutesDeclensionByNum(minutes)}`;
      break;
    case "medium":
      minutesText = `${minutes} мин`;
      break;
    case "short":
      minutesText = `${minutes} м`;
      break;
    case "short-no-space":
      minutesText = `${minutes}м`;
      break;
    default:
      minutesText = exhaustiveCheck(minutesNameSize);
  }

  return minutesText;
};
