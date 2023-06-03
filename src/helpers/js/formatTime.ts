import { caseByNum } from "./caseByNum.ts";

interface Options {
  trimTimeNames: boolean;
  genitiveCase: boolean;
}

const defaultOptions: Options = {
  trimTimeNames: false,
  genitiveCase: false,
};

export const formatTime = (minutes: number, options?: Partial<Options>) => {
  const fullOptions: Options = { ...defaultOptions, ...options };

  const minutesCaseByNum = fullOptions.genitiveCase
    ? caseByNum(["минуты", "минут", "минут"])
    : caseByNum(["минута", "минуты", "минут"]);

  const hoursCaseByNum = fullOptions.genitiveCase
    ? caseByNum(["часа", "часов", "часов"])
    : caseByNum(["час", "часа", "часов"]);

  const remainHours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;

  // example: "12 часов"
  const hoursText = `${remainHours} ${
    fullOptions.trimTimeNames ? "час" : hoursCaseByNum(remainHours)
  }`;

  // example: "3 мин"
  const minutesText = `${remainMinutes} ${
    fullOptions.trimTimeNames ? "мин" : minutesCaseByNum(remainMinutes)
  }`;

  if (remainHours <= 0) {
    return minutesText;
  }

  if (remainMinutes <= 0) {
    return hoursText;
  }

  return hoursText + " " + minutesText;
};
