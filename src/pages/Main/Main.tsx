import styles from "./main.module.css";
import { Heading } from "../../components/ui/Header";
import { Indent } from "../../components/ui/Indent";
import { Instructions } from "./Instructions";
import { TasksBlock } from "./TasksBlock";
import { Timer } from "./Timer";

export const Main = () => {
  return (
    <div className={styles.main}>
      <Timer />
      <div className={styles.tasks}>
        <Heading as="h1">Ура! Теперь можно начать работать:</Heading>
        <Instructions />
        <Indent size={25} />
        <TasksBlock />
      </div>
    </div>
  );
};
