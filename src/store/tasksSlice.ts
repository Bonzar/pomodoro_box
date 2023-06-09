import type { RootState } from "./store.ts";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { toast } from "sonner";
import { deleteTaskThank } from "./deleteTaskThank.ts";

interface ITask {
  id: string | number;
  title: string;
  predictedPomo: number;
  completedPomo: number;
  createdAt: number;
  isDeleted: boolean;
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
          isDeleted: false,
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
    deleteTask: (state, action: PayloadAction<{ id: string | number }>) => {
      const taskId = action.payload.id;

      const task = state.entities[taskId];

      if (!task) {
        toast.error(`Не найдена задача с id - "${taskId}" для удаления`);
        return;
      }

      task.isDeleted = true;
    },
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
  extraReducers: (builder) => {
    builder.addCase(deleteTaskThank.fulfilled, (state, action) => {
      tasksAdapter.removeOne(state, action.meta.arg.id);
    });
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

export const { selectAll: selectAllTasks, selectById: selectTaskById } =
  tasksAdapter.getSelectors((state: RootState) => state.tasks);

export const selectAllNotDeletedTasks = createSelector(
  [selectAllTasks],
  (allTasks) => allTasks.filter((task) => task.isDeleted === false)
);

export const selectFirstTask = (state: RootState) => {
  const lastTaskId = selectAllNotDeletedTasks(state).at(0);
  if (!lastTaskId) return;

  return selectTaskById(state, lastTaskId.id);
};

export const tasksSliceReducer = tasksSlice.reducer;
