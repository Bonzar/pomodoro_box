export const WEEK_DAYS_INDEXES = [0, 1, 2, 3, 4, 5, 6] as const;

export type WeekDayIndex = (typeof WEEK_DAYS_INDEXES)[number];

export const MILLISECONDS_IN_SECOND = 1000;

export const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * 60;

export const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;

export const MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * 24;

export const MILLISECONDS_IN_WEEK = MILLISECONDS_IN_DAY * 7;

export const MAX_PAUSE_DURATION_FOR_SAVING_STATS = MILLISECONDS_IN_HOUR * 3;

export const RANGE_SETTING_DEFAULT_CHANGE_STEP = 5;

export const RANGE_SETTING_DEFAULT_MIN_VALUE = 1;

export const DELETE_TASK_ANIMATION_DURATION = 500;

export const GRAPHIC_LEGEND_SEGMENTS_COUNT = 5;

export const DISABLE_NOTIFICATIONS_TOAST_ID = "DISABLE_NOTIFICATIONS_TOAST";

export const NOTIFICATIONS_PERMISSION_DENIED_TOAST_ID =
  "NOTIFICATIONS_PERMISSION_DENIED_TOAST";
