import styles from "./header.module.css";
import { LayoutContainer } from "../LayoutContainer";
import { Text } from "../../ui/Text";
import { Indent } from "../../ui/Indent";
import { Link } from "react-router-dom";
import { Icon } from "../../ui/Icon/Icon.tsx";

export const Header = () => (
  <header className={styles.header}>
    <LayoutContainer className={styles.headerContainer}>
      <Link to="/main" className={styles.navLink}>
        <Icon iconName="logo" />
        <Indent size={10} inline />
        <Text
          textSize={24}
          textLineHeight={24}
          textWeight={300}
          textColor="red"
        >
          pomodoro_box
        </Text>
      </Link>
      <nav>
        <Link to="stats" className={styles.navLink}>
          <Icon iconName="stats" iconColor="red" />
          <Indent size={10} inline />
          <Text textColor="red">Статистка</Text>
        </Link>
      </nav>
    </LayoutContainer>
  </header>
);
