import styles from "./addTaskForm.module.css";
import { preventDefault } from "../../../../helpers/react/preventDefault.ts";
import { Indent } from "../../../../components/ui/Indent";
import { Button } from "../../../../components/ui/Button";
import { TextEl } from "../../../../components/ui/TextEl";
import { useAppDispatch } from "../../../../store/hooks.ts";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { addTask } from "../../../../store/tasksSlice.ts";

export const AddTaskForm = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const newTitle = taskTitle.trim();
    if (!newTitle) {
      event.currentTarget
        .querySelector("input")
        ?.setCustomValidity("Название задачи не может быть пустым.");

      event.currentTarget.reportValidity();
      return;
    }

    dispatch(addTask(newTitle));
    setTaskTitle("");
  };

  return (
    <form onSubmit={preventDefault(handleSubmit)}>
      <TextEl htmlFor="task-name" as="label" style={{ display: "none" }}>
        Название задачи
      </TextEl>
      <TextEl
        as="input"
        value={taskTitle}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const input = event.currentTarget;
          input.setCustomValidity("");

          setTaskTitle(input.value);
        }}
        textWeight={300}
        className={styles.taskInput}
        id="task-name"
        type="text"
        placeholder="Название задачи"
      />
      <Indent size={25} />
      <Button btnColor="green" btnFilled>
        Добавить
      </Button>
    </form>
  );
};
