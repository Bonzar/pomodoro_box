import { caseByNum } from "./caseByNum.ts";
import { exhaustiveCheck } from "./exhaustiveCheck.ts";
import { toast } from "sonner";

type TimeNameSizes =
  | "full" // 5 часов
  | "medium" // 5 час
  | "short" // 5 ч
  | "short-no-space"; // 5ч

interface TimeNameSizesOptions {
  minutes: TimeNameSizes;
  hours: TimeNameSizes;
}

interface FormatTimeOptions {
  timeNameSize: TimeNameSizes | TimeNameSizesOptions;
  genitiveCase: boolean;
}

const defaultOptions: FormatTimeOptions = {
  timeNameSize: "full",
  genitiveCase: false,
};

const getHoursWithName = (
  hours: number,
  namesSize: FormatTimeOptions["timeNameSize"] = "full",
  genitiveCase = false
) => {
  const hoursCaseByNum = genitiveCase
    ? caseByNum(["часа", "часов", "часов"])
    : caseByNum(["час", "часа", "часов"]);

  const hoursNameSize =
    typeof namesSize === "object" ? namesSize.hours : namesSize;

  let hoursText: string | undefined;
  switch (hoursNameSize) {
    case "full":
      hoursText = `${hours} ${hoursCaseByNum(hours)}`;
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
      exhaustiveCheck(hoursNameSize);
      throw new Error("Ошибка форматирования часов");
  }

  return hoursText;
};

const getMinutesWithName = (
  minutes: number,
  namesSize: FormatTimeOptions["timeNameSize"] = "full",
  genitiveCase = false
) => {
  const minutesCaseByNum = genitiveCase
    ? caseByNum(["минуты", "минут", "минут"])
    : caseByNum(["минута", "минуты", "минут"]);

  const minutesNameSize =
    typeof namesSize === "object" ? namesSize.minutes : namesSize;

  let minutesText: string | undefined;
  switch (minutesNameSize) {
    case "full":
      minutesText = `${minutes} ${minutesCaseByNum(minutes)}`;
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
      exhaustiveCheck(minutesNameSize);
      throw new Error("Ошибка форматирования минут");
  }

  return minutesText;
};

export const formatTime = (
  minutes: number,
  options?: Partial<FormatTimeOptions>
) => {
  try {
    const fullOptions: FormatTimeOptions = { ...defaultOptions, ...options };

    const remainHours = Math.floor(minutes / 60);
    const remainMinutes = minutes % 60;

    const hoursWithName = getHoursWithName(
      remainHours,
      fullOptions.timeNameSize,
      fullOptions.genitiveCase
    );

    const minutesWithName = getMinutesWithName(
      remainMinutes,
      fullOptions.timeNameSize,
      fullOptions.genitiveCase
    );

    if (remainHours <= 0) {
      return minutesWithName;
    }

    if (remainMinutes <= 0) {
      return hoursWithName;
    }

    return hoursWithName + " " + minutesWithName;
  } catch (error) {
    if (typeof error === "string") {
      toast.error(error);
    } else {
      console.error(error);
    }
    return "";
  }
};
