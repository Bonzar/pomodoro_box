import type { PrepareAction } from "@reduxjs/toolkit";

export type PrepareResult<T> = ReturnType<PrepareAction<T>>;
