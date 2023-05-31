import styles from "./layout.module.css";
import { Content } from "./Content";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const Layout = () => (
  <div className={styles.layout}>
    <Header />
    <Content>
      <Outlet />
    </Content>
  </div>
);
