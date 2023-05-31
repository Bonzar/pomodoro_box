import styles from "./button.module.css";
import type { TextProps } from "../Text";
import { Text } from "../Text";
import { getClassName } from "../../../helpers/react/getClassName.ts";
import type { ExtendableProps } from "../../types/PolymorphicComponent";

interface IButtonProps {
  btnColor: "green" | "red";
  btnFilled?: boolean;
}

export type ButtonProps = ExtendableProps<TextProps<"button">, IButtonProps>;

export const Button = ({
  btnColor,
  textWeight = 500,
  btnFilled = false,
  className,
  children,
  ...other
}: ButtonProps) => {
  const classes = getClassName([
    className,
    styles.button,
    styles[`c-${btnColor}`],
    btnFilled && styles["filled"],
  ]);

  return (
    <Text textWeight={textWeight} as="button" className={classes} {...other}>
      {children}
    </Text>
  );
};
