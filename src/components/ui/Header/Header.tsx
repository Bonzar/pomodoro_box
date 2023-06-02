import type { PropsWithChildren } from "react";
import { TextEl } from "../TextEl";

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <TextEl as="h1" textSize={24} textLineHeight={33} textWeight={700}>
      {children}
    </TextEl>
  );
};
