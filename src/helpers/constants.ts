export const WEEK_DAYS_INDEXES = [0, 1, 2, 3, 4, 5, 6] as const;

export type WeekDayIndex = (typeof WEEK_DAYS_INDEXES)[number];

export const MILLISECONDS_IN_SECOND = 1000;

export const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * 60;

export const MILLISECONDS_IN_DAY = MILLISECONDS_IN_MINUTE * 60 * 24;

export const MILLISECONDS_IN_WEEK = MILLISECONDS_IN_DAY * 7;

export const WEEKDAY_DICT = {
  0: "Понедельник",
  1: "Вторник",
  2: "Среда",
  3: "Четверг",
  4: "Пятница",
  5: "Суббота",
  6: "Воскресенье",
} as const;

export const WEEKDAY_SHORT_DICT = {
  0: "Пн",
  1: "Вт",
  2: "Ср",
  3: "Чт",
  4: "Пт",
  5: "Сб",
  6: "Вс",
} as const;

export const SETTINGS_CHANGE_STEP = 5;

export const SETTINGS_MIN_VALUE = 1;

export const DELETE_TASK_ANIMATION_DURATION = 500;
