import type { CSSProperties } from "react";
import type { TIndent } from "../../../assets/types/TIndent.ts";

type TIndentProps = {
  size: TIndent;
  inline?: boolean;
  className?: string;
};

export const Indent = ({ inline = false, size, className }: TIndentProps) => {
  const Component = inline ? "span" : "div";
  const paddingDirection = inline ? "paddingLeft" : "paddingTop";

  const style: CSSProperties = {
    [paddingDirection]: `var(--indent-${size})`,
  };

  return <Component style={style} className={className}></Component>;
};
