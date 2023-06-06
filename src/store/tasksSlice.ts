import type { RootState } from "./store.ts";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createEntityAdapter, createSlice, nanoid } from "@reduxjs/toolkit";
import type { PrepareResult } from "./types.ts";

interface ITask {
  id: string | number;
  title: string;
  predictedPomo: number;
}

const tasksAdapter = createEntityAdapter<ITask>();

const initialState = tasksAdapter.getInitialState();

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer: tasksAdapter.addOne,
      prepare: (title: string): PrepareResult<ITask> => ({
        payload: { id: nanoid(), title, predictedPomo: 1 },
      }),
    },
    editTask: (
      state,
      action: PayloadAction<{ id: string | number; title: string }>
    ) => {
      const task = state.entities[action.payload.id];

      if (task) {
        tasksAdapter.upsertOne(state, {
          ...action.payload,
          predictedPomo: task.predictedPomo,
        });
      }
    },
    deleteTask: tasksAdapter.removeOne,
    incrementPredictedPomo: (
      state,
      action: PayloadAction<{ id: string | number }>
    ) => {
      const task = state.entities[action.payload.id];
      if (task) {
        task.predictedPomo++;
      }
    },
    decrementPredictedPomo: (
      state,
      action: PayloadAction<{ id: string | number }>
    ) => {
      const task = state.entities[action.payload.id];
      if (task && !(task.predictedPomo <= 1)) {
        task.predictedPomo--;
      }
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  incrementPredictedPomo,
  decrementPredictedPomo,
} = tasksSlice.actions;

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTasksIds,
} = tasksAdapter.getSelectors((state: RootState) => state.tasks);

export const tasksSliceReducer = tasksSlice.reducer;
