import styles from "./addTaskForm.module.css";
import { preventDefault } from "../../../../helpers/react/preventDefault.ts";
import { Indent } from "../../../../components/ui/Indent";
import { Button } from "../../../../components/ui/Button";
import { TextEl } from "../../../../components/ui/TextEl";

export const AddTaskForm = () => {
  const handleSubmit = () => {
    /* empty */
    console.log("hi");
  };

  return (
    <form onSubmit={preventDefault(handleSubmit)}>
      <TextEl htmlFor="task-name" as="label" style={{ display: "none" }}>
        Название задачи
      </TextEl>
      <TextEl
        as="input"
        id="task-name"
        textWeight={300}
        type="text"
        className={styles.taskInput}
        placeholder="Название задачи"
      />
      <Indent size={25} />
      <Button btnColor="green" btnFilled>
        Добавить
      </Button>
    </form>
  );
};
