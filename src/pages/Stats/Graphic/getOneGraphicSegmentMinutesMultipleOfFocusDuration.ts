import {
  GRAPHIC_LEGEND_SEGMENTS_COUNT,
  MILLISECONDS_IN_MINUTE,
} from "../../../helpers/constants.ts";

export const getOneGraphicSegmentMinutesMultipleOfFocusDuration = (
  maxStatsValueMilliseconds: number,
  focusDuration: number
) => {
  const segmentMinutes = Math.round(
    Math.ceil(
      maxStatsValueMilliseconds /
        MILLISECONDS_IN_MINUTE /
        focusDuration /
        GRAPHIC_LEGEND_SEGMENTS_COUNT
    ) * focusDuration
  );

  if (segmentMinutes === 0) {
    return focusDuration;
  }

  return segmentMinutes;
};
