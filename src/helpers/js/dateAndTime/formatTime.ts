import { getHoursWithName } from "./getHoursWithName.ts";
import { getMinutesWithName } from "./getMinutesWithName.ts";

type TimeNameSizes =
  | "full" // 5 часов
  | "medium" // 5 час
  | "short" // 5 ч
  | "short-no-space"; // 5ч

export interface TextCasesDict {
  nominative: [string, string, string];
  genitive: [string, string];
  dative: [string, string];
  accusative: [string, string, string];
  creative: [string, string];
  prepositional: [string, string];
}

interface TimeNameSizesOptions {
  minutes: TimeNameSizes;
  hours: TimeNameSizes;
}

export interface FormatTimeOptions {
  nameSize: TimeNameSizes | TimeNameSizesOptions;
  case: keyof TextCasesDict;
}

const defaultOptions: FormatTimeOptions = {
  nameSize: "full",
  case: "nominative",
};

export const formatTime = (
  minutes: number,
  options?: Partial<FormatTimeOptions>
) => {
  const fullOptions: FormatTimeOptions = { ...defaultOptions, ...options };

  const remainHours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;

  const hoursWithName = getHoursWithName(remainHours, fullOptions);
  const minutesWithName = getMinutesWithName(remainMinutes, fullOptions);

  if (remainHours <= 0) {
    return minutesWithName;
  }

  if (remainMinutes <= 0) {
    return hoursWithName;
  }

  return hoursWithName + " " + minutesWithName;
};
