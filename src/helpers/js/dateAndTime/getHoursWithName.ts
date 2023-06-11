import { declensionByNum } from "../declensionByNum.ts";
import { exhaustiveCheck } from "../exhaustiveCheck.ts";
import type { FormatTimeOptions, TextCasesDict } from "./formatTime.ts";

const casesOfHours: TextCasesDict = {
  nominative: ["час", "часа", "часов"],
  genitive: ["часа", "часов"],
  dative: ["часу", "часам"],
  accusative: ["час", "часа", "часов"],
  creative: ["часом", "часами"],
  prepositional: ["часе", "часах"],
};

export const getHoursWithName = (hours: number, options: FormatTimeOptions) => {
  const getHoursDeclensionByNum = declensionByNum(casesOfHours.nominative);

  const hoursNameSize =
    typeof options.nameSize === "object"
      ? options.nameSize.hours
      : options.nameSize;

  let hoursText: string;
  switch (hoursNameSize) {
    case "full":
      hoursText = `${hours} ${getHoursDeclensionByNum(hours)}`;
      break;
    case "medium":
      hoursText = `${hours} час`;
      break;
    case "short":
      hoursText = `${hours} ч`;
      break;
    case "short-no-space":
      hoursText = `${hours}ч`;
      break;
    default:
      hoursText = exhaustiveCheck(hoursNameSize);
  }

  return hoursText;
};
