import type { ReactNode } from "react";
import styles from "./layoutContainer.module.css";
import { getClassName } from "../../../helpers/react/getClassName.ts";

interface ILayoutContainerProps {
  children: ReactNode;
  className?: string;
}

export const LayoutContainer = ({
  children,
  className,
}: ILayoutContainerProps) => {
  const classes = getClassName([styles.container, className]);

  return <div className={classes}>{children}</div>;
};
