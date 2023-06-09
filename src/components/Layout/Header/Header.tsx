import styles from "./header.module.css";
import { LayoutContainer } from "../LayoutContainer";
import { TextEl } from "../../ui/TextEl";
import { Indent } from "../../ui/Indent";
import { Link } from "react-router-dom";
import { Icon } from "../../ui/Icon/Icon.tsx";

export const Header = () => (
  <header className={styles.header}>
    <LayoutContainer className={styles.headerContainer}>
      <Link to="/" className={styles.navLink}>
        <Icon iconName="logo" width={40} height={40} />
        <Indent size={10} inline />
        <TextEl
          textSize={24}
          textLineHeight={24}
          textWeight={300}
          textColor="red"
        >
          pomodoro_box
        </TextEl>
      </Link>
      <nav className={styles.navLinks}>
        <Link
          to="settings"
          className={styles.navLink}
          aria-label="Страница настроек"
        >
          <Icon
            className={styles.navLinkIcon}
            iconName="settings"
            iconColor="red"
          />
          <TextEl textColor="red" className={styles.navLinkText}>
            <Indent size={10} inline />
            Настройки
          </TextEl>
        </Link>
        <Indent size={19} inline />
        <Link
          to="stats"
          className={styles.navLink}
          aria-label="Страница статистики"
        >
          <Icon
            className={styles.navLinkIcon}
            iconName="stats"
            iconColor="red"
          />
          <TextEl textColor="red" className={styles.navLinkText}>
            <Indent size={10} inline />
            Статистка
          </TextEl>
        </Link>
      </nav>
    </LayoutContainer>
  </header>
);
