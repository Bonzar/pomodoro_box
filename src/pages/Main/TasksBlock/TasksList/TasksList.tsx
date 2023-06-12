import styles from "./tasksList.module.css";
import { Divider } from "../../../../components/ui/Divider";
import { TextEl } from "../../../../components/ui/TextEl";
import { Indent } from "../../../../components/ui/Indent";
import { TaskItem } from "./TaskItem";
import { formatTime } from "../../../../helpers/js/dateAndTime/formatTime.ts";
import { useAppSelector } from "../../../../store/hooks.ts";
import { selectAllNotDeletedTasks } from "../../../../store/tasksSlice.ts";
import { selectTimer } from "../../../../store/timerSlice.ts";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { createRef, useRef } from "react";
import { DELETE_TASK_ANIMATION_DURATION } from "../../../../helpers/constants.ts";

const animationClassnamesMap = {
  enter: styles.taskEnter,
  enterActive: styles.taskEnterActive,
  exit: styles.taskExit,
  exitActive: styles.taskExitActive,
};

export const TasksList = () => {
  const allTasks = useAppSelector(selectAllNotDeletedTasks);

  const { focusDuration } = useAppSelector(selectTimer);

  const tasksListRef = useRef<HTMLDivElement>(null);

  const predictedPomoSum = allTasks.reduce(
    (total, current) => total + current.predictedPomo,
    0
  );

  const isTasksListNotEmpty = allTasks.length > 0;

  return (
    <CSSTransition
      nodeRef={tasksListRef}
      in={isTasksListNotEmpty}
      timeout={DELETE_TASK_ANIMATION_DURATION}
      classNames={animationClassnamesMap}
      unmountOnExit
    >
      <div ref={tasksListRef} className={styles.style}>
        <Indent size={25} />
        <Divider dividerColor="gray-E4" />
        <TransitionGroup>
          {allTasks.map(({ id }, index) => {
            const ref = createRef<HTMLDivElement>();

            return (
              <CSSTransition
                key={id}
                nodeRef={ref}
                timeout={DELETE_TASK_ANIMATION_DURATION}
                classNames={animationClassnamesMap}
              >
                <div ref={ref}>
                  <TaskItem id={id} />
                  {index !== allTasks.length - 1 && (
                    <Divider dividerColor="gray-E4" />
                  )}
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        <Divider dividerColor="gray-E4" />
        <Indent size={19} />
        <TextEl textWeight={300} className={styles.predictedPomoTime}>
          {formatTime(predictedPomoSum * focusDuration, {
            nameSize: "medium",
          })}
        </TextEl>
      </div>
    </CSSTransition>
  );
};
