import { tasksSliceReducer } from "./tasksSlice.ts";
import { timerSliceReducer } from "./timerSlice.ts";

export const reducer = {
  tasks: tasksSliceReducer,
  timer: timerSliceReducer,
};
