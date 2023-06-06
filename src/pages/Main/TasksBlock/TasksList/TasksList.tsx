import styles from "./tasksList.module.css";
import { Divider } from "../../../../components/ui/Divider";
import { TextEl } from "../../../../components/ui/TextEl";
import { Indent } from "../../../../components/ui/Indent";
import { TaskItem } from "./TaskItem";
import { mergeLeft, objOf, pipe } from "ramda";
import type { ListItem } from "../../../../components/ui/List";
import { List } from "../../../../components/ui/List";
import { assocKeyAsId } from "../../../../helpers/react/assocKeyAsId.ts";
import { formatTime } from "../../../../helpers/js/formatTime.ts";
import { useAppSelector } from "../../../../store/hooks.ts";
import { selectAllTasks } from "../../../../store/tasksSlice.ts";

const FOCUS_TIME = 25;

export const TasksList = () => {
  const allTasks = useAppSelector(selectAllTasks);

  const tasksList: ListItem<typeof TaskItem>[] = allTasks.map(
    pipe(({ id }) => id, objOf("id"), mergeLeft({ as: TaskItem }), assocKeyAsId)
  );

  const predictedPomoSum = allTasks.reduce(
    (total, current) => total + current.predictedPomo,
    0
  );

  return (
    <div className={styles.style}>
      <Divider dividerColor="gray-E4" />
      <List // tasks list
        list={tasksList}
        divider={() => <Divider dividerColor="gray-E4" />}
      />
      <Divider dividerColor="gray-E4" />
      <Indent size={19} />
      <TextEl textWeight={300} textColor="gray-99">
        {formatTime(predictedPomoSum * FOCUS_TIME, { trimTimeNames: true })}
      </TextEl>
    </div>
  );
};
