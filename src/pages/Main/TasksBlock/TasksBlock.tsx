import { AddTaskForm } from "./AddTaskForm";
import styles from "./tasksBlock.module.css";
import { TasksList } from "./TasksList";

export const TasksBlock = () => (
  <div className={styles.tasksBlock}>
    <AddTaskForm />
    <TasksList />
  </div>
);
