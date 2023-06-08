import styles from "./taskItem.module.css";
import { TextEl } from "../../../../../components/ui/TextEl";
import { Actions } from "./Actions";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks.ts";
import { editTask, selectTaskById } from "../../../../../store/tasksSlice.ts";
import { memo, useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../../../../../hooks/useOutsideClick.ts";
import { preventDefault } from "../../../../../helpers/react/preventDefault.ts";

interface ITaskItemProps {
  id: string | number;
}

interface ITaskEditNameProps {
  id: string | number;
  initialTitle: string;
  onSave: VoidFunction;
}

const TaskEditName = ({ id, initialTitle, onSave }: ITaskEditNameProps) => {
  const [title, setTitle] = useState(initialTitle);

  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const saveTask = () => {
    onSave();
    const newTitle = title.trim();

    if (!newTitle) {
      return;
    }

    dispatch(editTask({ id, title: newTitle }));
  };

  useOutsideClick(inputRef, saveTask);

  return (
    <form onSubmit={preventDefault(saveTask)} className={styles.nameForm}>
      <input
        className={styles.nameField}
        ref={inputRef}
        type="text"
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
      />
    </form>
  );
};

export const TaskItem = memo(function TaskItemMemo({ id }: ITaskItemProps) {
  const task = useAppSelector((state) => selectTaskById(state, id));
  const [isEditing, setIsEditing] = useState(false);

  if (!task) {
    return <TextEl textColor="red-dark">Задача с id - {id} не найдена</TextEl>;
  }

  return (
    <div className={styles.task}>
      <div className={styles.pomodoroCount}>
        <TextEl textWeight={300}>{task.predictedPomo}</TextEl>
      </div>
      <TextEl as="div" textWeight={300} className={styles.nameWrapper}>
        {!isEditing ? (
          <span className={styles.nameField}>{task.title}</span>
        ) : (
          <TaskEditName
            id={id}
            initialTitle={task.title}
            onSave={() => setIsEditing(false)}
          />
        )}
      </TextEl>

      <div className={styles.actions}>
        <Actions id={id} onEditClick={() => setIsEditing(true)} />
      </div>
    </div>
  );
});
