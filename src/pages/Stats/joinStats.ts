import type { IStatNote } from "../../store/statsSlice.ts";
import { exhaustiveCheck } from "../../helpers/js/exhaustiveCheck.ts";

export const joinStats = (stats: IStatNote[]) => {
  const joinedStats = {
    completedPomo: 0, // count
    focusTime: 0, // milliseconds
    breakTime: 0, // milliseconds
    pauseTime: 0, // milliseconds
    stopsCount: 0, // count
  };

  for (const statItem of stats) {
    const statItemType = statItem.type;

    switch (statItemType) {
      case "FOCUS":
        joinedStats.focusTime += statItem.duration;
        break;
      case "BREAK":
        joinedStats.breakTime += statItem.duration;
        break;
      case "PAUSE":
        joinedStats.pauseTime += statItem.duration;
        break;
      case "POMO":
        joinedStats.completedPomo += 1;
        break;
      case "STOP":
        joinedStats.stopsCount += 1;
        break;
      default:
        exhaustiveCheck(statItemType);
    }
  }

  return joinedStats;
};
