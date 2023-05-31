import styles from "./header.module.css";
import logoSrc from "../../../assets/icons/logo.svg";
import { LayoutContainer } from "../LayoutContainer";
import { Text } from "../../ui/Text";
import { Indent } from "../../ui/Indent";
import { Link } from "react-router-dom";

export const Header = () => (
  <header className={styles.header}>
    <LayoutContainer className={styles.headerContainer}>
      <Link to="/" className={styles.logo}>
        <img
          src={logoSrc}
          alt={"Pomodoro_box logo - flat image of a tomato with a green tail"}
        />
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
    </LayoutContainer>
  </header>
);
