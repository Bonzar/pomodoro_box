import { AddTaskForm } from "./AddTaskForm";
import styles from "./tasksBlock.module.css";
import { TasksList } from "./TasksList";
import { Indent } from "../../../components/ui/Indent";

export const TasksBlock = () => {
  return (
    <div className={styles.tasksBlock}>
      <AddTaskForm />
      <Indent size={25} />
      <TasksList />
    </div>
  );
};
