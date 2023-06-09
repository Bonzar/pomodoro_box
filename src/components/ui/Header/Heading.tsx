import type { PropsWithChildren } from "react";
import { TextEl } from "../TextEl";

interface IHeaderProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}

export const Heading = ({ children, as }: PropsWithChildren<IHeaderProps>) => {
  return (
    <TextEl as={as} textSize={24} textLineHeight={33} textWeight={700}>
      {children}
    </TextEl>
  );
};
