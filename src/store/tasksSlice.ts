import type { RootState } from "./store.ts";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createEntityAdapter, createSlice, nanoid } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface ITask {
  id: string | number;
  title: string;
  predictedPomo: number;
  completedPomo: number;
  createdAt: number;
}

const tasksAdapter = createEntityAdapter<ITask>({
  sortComparer: (a, b) => a.createdAt - b.createdAt,
});

const initialState = tasksAdapter.getInitialState();

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer: tasksAdapter.addOne,
      prepare: (title: string) => ({
        payload: {
          id: nanoid(),
          title,
          predictedPomo: 1,
          completedPomo: 0,
          createdAt: Date.now(),
        },
      }),
    },
    updateTask: tasksAdapter.upsertOne,
    editTask: (
      state,
      action: PayloadAction<{ id: string | number; title: string }>
    ) => {
      const task = state.entities[action.payload.id];

      if (task) {
        tasksAdapter.upsertOne(state, { ...task, ...action.payload });
      }
    },
    deleteTask: tasksAdapter.removeOne,
    incrementTaskCompletedPomo: (
      state,
      action: PayloadAction<{ id: string | number }>
    ) => {
      const task = state.entities[action.payload.id];
      if (task) {
        task.completedPomo++;
      }
    },
    incrementTaskPredictedPomo: (
      state,
      action: PayloadAction<{ id: string | number }>
    ) => {
      const task = state.entities[action.payload.id];
      if (task) {
        task.predictedPomo++;
      }
    },
    decrementTaskPredictedPomo: (
      state,
      action: PayloadAction<{ id: string | number }>
    ) => {
      const task = state.entities[action.payload.id];
      if (task) {
        if (task.predictedPomo > 1) {
          task.predictedPomo--;
        } else {
          toast.error(
            "Предварительное кол-во помидоров не может быть меньше 1"
          );
        }
      }
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  incrementTaskPredictedPomo,
  decrementTaskPredictedPomo,
  incrementTaskCompletedPomo,
} = tasksSlice.actions;

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTasksIds,
} = tasksAdapter.getSelectors((state: RootState) => state.tasks);

export const selectFirstTask = (state: RootState) => {
  const lastTaskId = selectTasksIds(state).at(0);
  if (!lastTaskId) return;

  return selectTaskById(state, lastTaskId);
};

export const tasksSliceReducer = tasksSlice.reducer;
