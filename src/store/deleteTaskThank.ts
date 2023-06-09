import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteTask } from "./tasksSlice.ts";
import { sleep } from "../helpers/js/sleep.ts";
import { DELETE_TASK_ANIMATION_DURATION } from "../helpers/constants.ts";

export const deleteTaskThank = createAsyncThunk<true, { id: string | number }>(
  "deleteTaskThank",
  async ({ id }, { dispatch }) => {
    dispatch(deleteTask({ id }));

    await sleep(DELETE_TASK_ANIMATION_DURATION + 1000);

    return true as const;
  }
);
