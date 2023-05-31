import styles from "./content.module.css";
import type { ReactNode } from "react";
import { LayoutContainer } from "../LayoutContainer";

interface IContentProps {
  children: ReactNode;
}

export function Content({ children }: IContentProps) {
  return (
    <LayoutContainer className={styles.content}>{children}</LayoutContainer>
  );
}
