import styles from "./buttonCircle.module.css";
import type { ExtendableProps } from "../../../assets/types/PolymorphicComponent.ts";
import type { TextProps } from "../TextEl";
import { Icon } from "../Icon/Icon.tsx";
import { getClassName } from "../../../helpers/react/getClassName.ts";

interface IButtonCircleProps {
  btnType: "plus" | "minus";
}

export type ButtonProps = Omit<
  ExtendableProps<TextProps<"button">, IButtonCircleProps>,
  "children"
>;

export const ButtonCircle = ({ btnType, className, ...other }: ButtonProps) => (
  <button className={getClassName([className, styles.buttonCircle])} {...other}>
    <Icon iconName={btnType} />
  </button>
);
