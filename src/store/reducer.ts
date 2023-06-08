import { tasksSliceReducer } from "./tasksSlice.ts";
import { timerSliceReducer } from "./timerSlice.ts";
import { statsSliceReducer } from "./statsSlice.ts";

export const reducer = {
  tasks: tasksSliceReducer,
  timer: timerSliceReducer,
  stats: statsSliceReducer,
};
