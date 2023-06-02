import styles from "./main.module.css";
import { Header } from "../../components/ui/Header";
import { Indent } from "../../components/ui/Indent";
import { Instructions } from "./Instructions";
import { TasksBlock } from "./TasksBlock";
import { Timer } from "./Timer";

export const Main = () => {
  return (
    <div className={styles.main}>
      <Timer />
      <div className={styles.tasks}>
        <Header>Ура! Теперь можно начать работать:</Header>
        <Instructions />
        <Indent size={25} />
        <TasksBlock />
      </div>
    </div>
  );
};
