import styles from "./main.module.css";
import { Heading } from "../../components/ui/Heading";
import { Indent } from "../../components/ui/Indent";
import { Instructions } from "./Instructions";
import { TasksBlock } from "./TasksBlock";
import { Timer } from "./Timer";
import { useAppSelector } from "../../store/hooks.ts";
import { selectInstructionsVisibility } from "../../store/tasksSlice.ts";

export const Main = () => {
  const instructionsVisibility = useAppSelector(selectInstructionsVisibility);

  return (
    <div className={styles.main}>
      <div // timer wrapper for position sticky
      >
        <div className={styles.timer}>
          <Timer />
        </div>
      </div>
      <div className={styles.tasks}>
        <Heading as="h1">
          {instructionsVisibility
            ? "Ура! Теперь можно начать работать:"
            : "Список дел:"}
        </Heading>
        {instructionsVisibility && <Instructions />}
        <Indent size={25} />
        <TasksBlock />
      </div>
    </div>
  );
};
