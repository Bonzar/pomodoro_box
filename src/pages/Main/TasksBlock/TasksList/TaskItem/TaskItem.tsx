import styles from "./taskItem.module.css";
import { TextEl } from "../../../../../components/ui/TextEl";
import { Indent } from "../../../../../components/ui/Indent";
import { Icon } from "../../../../../components/ui/Icon/Icon.tsx";

interface ITaskItemProps {
  id: string;
}

export const TaskItem = ({ id }: ITaskItemProps) => (
  <div className={styles.task}>
    <div className={styles.pomodoroCount}>
      <TextEl textWeight={300}>1</TextEl>
    </div>
    <Indent size={10} inline />
    <TextEl className={styles.name} textWeight={300}>
      Task name - {id}
    </TextEl>
    <Icon iconName="threeDots" iconColor="gray-C4" className={styles.menuBtn} />
  </div>
);
