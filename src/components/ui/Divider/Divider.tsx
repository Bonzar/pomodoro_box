import styles from "./divider.module.css";
import { getClassName } from "../../../helpers/react/getClassName.ts";
import type { CSSProperties } from "react";
import type { TColor } from "../../../assets/types/TColor.ts";
import type {
  TTextLineHeight,
  TTextSize,
} from "../../../assets/types/TText.ts";
import type { InheritableElementProps } from "../../../assets/types/PolymorphicComponent.ts";

interface IDividerProps {
  dividerColor?: TColor;
  dividerThickness?: 1 | 2 | 3 | 4;
  column?: boolean;
  dividerColumnHeight?: TTextSize | TTextLineHeight | "100%";
}

type DividerProps = InheritableElementProps<"hr", IDividerProps>;

export const Divider = ({
  style,
  dividerColor = "black",
  dividerThickness = 1,
  className,
  column = false,
  dividerColumnHeight,
  ...other
}: DividerProps) => {
  const dividerStyles = {
    ...style,
    ["--divider-color"]: `var(--${dividerColor})`,
  } as CSSProperties;

  if (!column) {
    dividerStyles.height = dividerThickness;
    dividerStyles.marginBottom = dividerThickness * -1;
  } else {
    if (dividerColumnHeight === "100%") {
      dividerStyles.height = "100%";
    } else if (dividerColumnHeight !== undefined) {
      dividerStyles.height = `var(--font-size-${dividerColumnHeight})`;
    }
    dividerStyles.width = dividerThickness;
    dividerStyles.marginRight = dividerThickness * -1;
  }

  return (
    <hr
      className={getClassName([
        className,
        styles.divider,
        column ? styles.column : styles.row,
      ])}
      style={dividerStyles}
      {...other}
    />
  );
};
