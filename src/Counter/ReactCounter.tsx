import { useState } from "react";
import { Counter } from "./Counter.tsx";

export const ReactCounter = () => {
  const [count, setCount] = useState(0);

  return <Counter value={count} onButtonClick={() => setCount(count + 1)} />;
};
