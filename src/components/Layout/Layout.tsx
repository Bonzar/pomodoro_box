import type { ReactNode } from "react";
import styles from "./layout.module.css";
import { Content } from "./Content";
import { Header } from "./Header";

interface ILayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => (
  <div className={styles.layout}>
    <Header />
    <Content>{children}</Content>
  </div>
);
