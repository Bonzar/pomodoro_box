import styles from "./text.module.css";
import { getClassName } from "../../../helpers/react/getClassName.ts";
import type { ElementType, PropsWithChildren } from "react";
import type { TColor } from "../../../assets/types/TColor.ts";
import type {
  TTextLineHeight,
  TTextSize,
  TTextWeight,
} from "../../../assets/types/TText.ts";
import type { PolymorphicComponentProps } from "../../../assets/types/PolymorphicComponent.ts";

interface ITextProps {
  textColor?: TColor;
  textSize?: TTextSize;
  textLineHeight?: TTextLineHeight;
  textWeight?: TTextWeight;
}

export type TextProps<E extends ElementType> = PropsWithChildren<
  PolymorphicComponentProps<E, ITextProps>
>;

export const Text = <E extends ElementType = "span">({
  as,
  children,
  textColor,
  textSize = 16,
  textLineHeight = 17,
  textWeight = 400,
  className,
  ...other
}: TextProps<E>) => {
  const Component = as ?? "span";

  const classes = getClassName([
    className,
    styles.text,
    textColor && styles[`c-${textColor}`],
    styles[`lh-${textLineHeight}`],
    styles[`s-${textSize}`],
    styles[`w-${textWeight}`],
  ]);

  return (
    <Component {...other} className={classes}>
      {children}
    </Component>
  );
};
