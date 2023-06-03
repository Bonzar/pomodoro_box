import styles from "./timer.module.css";
import { TextEl } from "../../../components/ui/TextEl";
import { Indent } from "../../../components/ui/Indent";
import { Button } from "../../../components/ui/Button";
import { Icon } from "../../../components/ui/Icon/Icon.tsx";

export const Timer = () => (
  <div>
    <div className={styles.header}>
      <TextEl textWeight={700} textColor="white">
        Сверстать сайт
      </TextEl>
      <TextEl textColor="white">Помидор 1</TextEl>
    </div>
    <div className={styles.timer}>
      <TextEl textWeight={200} className={styles.timerTime}>
        25:00
        <Indent size={10} />
      </TextEl>
      <div className={styles.timerTaskDescribe}>
        <TextEl textColor="gray-99">
          Задача 1 - <TextEl textColor="black">Сверстать сайт</TextEl>
        </TextEl>
        <Indent size={32} />
      </div>
      <div className={styles.actionsBlock}>
        <div className={styles.actions}>
          <Button btnColor="green">Старт</Button>
          <Button btnColor="red" disabled>
            Стоп
          </Button>
        </div>
      </div>
      <button className={styles.addButton}>
        <Icon iconName="plus" />
      </button>
    </div>
  </div>
);
