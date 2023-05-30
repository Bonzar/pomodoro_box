import { Counter } from "./Counter.tsx";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { incrementCounter, selectCounter } from "../store/counterSlice.ts";

export const ReduxCounter = () => {
  const dispatch = useAppDispatch();
  const counter = useAppSelector(selectCounter);

  return (
    <Counter
      value={counter.value}
      onButtonClick={() => dispatch(incrementCounter())}
    />
  );
};
