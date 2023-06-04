import styles from "./taskItem.module.css";
import { TextEl } from "../../../../../components/ui/TextEl";
import { Indent } from "../../../../../components/ui/Indent";
import { Actions } from "./Actions";

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
    <div className={styles.actions}>
      <Actions id={id} />
    </div>
  </div>
);
