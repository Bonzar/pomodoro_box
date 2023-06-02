import styles from "./tasksList.module.css";
import { Divider } from "../../../../components/ui/Divider";
import { TextEl } from "../../../../components/ui/TextEl";
import { Indent } from "../../../../components/ui/Indent";
import { TaskItem } from "./TaskItem";
import { mergeLeft, objOf, pipe } from "ramda";
import { List } from "../../../../components/ui/List";
import { assocKeyAsId } from "../../../../helpers/react/assocKeyAsId.ts";

const FOCUS_TIME = 25;

const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours <= 0) {
    return `${remainingMinutes} мин`;
  }

  if (remainingMinutes <= 0) {
    return `${hours} час`;
  }

  return `${hours} час ${remainingMinutes} мин`;
};

export const TasksList = () => {
  const tasks = ["1", "2", "3"].map(
    pipe(objOf("id"), mergeLeft({ as: TaskItem }), assocKeyAsId)
  );

  return (
    <div className={styles.style}>
      <Divider dividerColor="gray-E4" />
      <List list={tasks} divider={() => <Divider dividerColor="gray-E4" />} />
      <Divider dividerColor="gray-E4" />
      <Indent size={19} />
      <TextEl textWeight={300} textColor="gray-99">
        {formatTime(tasks.length * FOCUS_TIME)}
      </TextEl>
    </div>
  );
};
