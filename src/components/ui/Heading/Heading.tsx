import type { PropsWithChildren } from "react";
import { TextEl } from "../TextEl";

interface IHeadingProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}

export const Heading = ({ children, as }: PropsWithChildren<IHeadingProps>) => {
  return (
    <TextEl as={as} textSize={24} textLineHeight={33} textWeight={700}>
      {children}
    </TextEl>
  );
};
