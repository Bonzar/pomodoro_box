import { isTruthy } from "../js/isTruthy.ts";

export const getClassName = (
  classList: (string | null | undefined | false)[]
) => {
  return classList.filter(isTruthy).join(" ");
};
