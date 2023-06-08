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
import { selectTimer } from "../../../../store/timerSlice.ts";
import { useMemo } from "react";

export const TasksList = () => {
  const allTasks = useAppSelector(selectAllTasks);
  const { focusDuration } = useAppSelector(selectTimer);

  const tasksList: ListItem<typeof TaskItem>[] = useMemo(
    () =>
      allTasks.map(
        pipe(
          ({ id }) => id,
          objOf("id"),
          mergeLeft({ as: TaskItem }),
          assocKeyAsId
        )
      ),
    [allTasks]
  );

  const predictedPomoSum = allTasks.reduce(
    (total, current) => total + current.predictedPomo,
    0
  );

  if (tasksList.length <= 0) {
    return null;
  }

  return (
    <div className={styles.style}>
      <Indent size={25} />
      <Divider dividerColor="gray-E4" />
      <List // tasks list
        list={tasksList}
        divider={<Divider dividerColor="gray-E4" />}
      />
      <Divider dividerColor="gray-E4" />
      <Indent size={19} />
      <TextEl textWeight={300} textColor="gray-99">
        {formatTime(predictedPomoSum * focusDuration, { trimTimeNames: true })}
      </TextEl>
    </div>
  );
};
