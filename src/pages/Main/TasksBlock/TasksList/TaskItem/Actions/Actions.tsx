import styles from "./actions.module.css";
import { Dropdown } from "../../../../../../components/ui/Dropdown";
import { Icon } from "../../../../../../components/ui/Icon/Icon.tsx";
import { TextEl } from "../../../../../../components/ui/TextEl";
import { Indent } from "../../../../../../components/ui/Indent";
import { List } from "../../../../../../components/ui/List";
import { mergeLeft, pipe } from "ramda";
import type { TIcons } from "../../../../../../assets/types/TIcons.ts";
import { useState } from "react";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { useAppDispatch } from "../../../../../../store/hooks.ts";
import {
  decrementTaskPredictedPomo,
  incrementTaskPredictedPomo,
} from "../../../../../../store/tasksSlice.ts";

interface IActionsProps {
  id: string | number;
  onEditClick: VoidFunction;
}

interface IActionItemProps {
  id: string | number;
  name: string;
  iconName: TIcons;
  onClick?: VoidFunction;
}

const ActionItem = ({ iconName, name, onClick, id }: IActionItemProps) => (
  <button className={styles.dropdownItem} onClick={onClick}>
    <Icon iconName={iconName} iconColor="green-light" />
    <Indent size={10} inline />
    <TextEl textWeight={300} className={styles.actionText}>
      {name} {id}
    </TextEl>
  </button>
);

export const Actions = ({ id, onEditClick }: IActionsProps) => {
  const dispatch = useAppDispatch();

  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);

  const handleDeleteTask = () => setIsDeleteTaskModalOpen(true);

  const handleIncrementPredictPomo = () =>
    dispatch(incrementTaskPredictedPomo({ id }));

  const handleDecrementPredictPomo = () =>
    dispatch(decrementTaskPredictedPomo({ id }));

  const actions = [
    {
      name: "Увеличить",
      iconName: "plusAction" as const,
      onClick: handleIncrementPredictPomo,
    },
    {
      name: "Уменьшить",
      iconName: "minusAction" as const,
      onClick: handleDecrementPredictPomo,
    },
    {
      name: "Редактировать",
      iconName: "penAction" as const,
      onClick: onEditClick,
    },
    {
      name: "Удалить",
      iconName: "basketAction" as const,
      onClick: handleDeleteTask,
    },
  ].map(
    pipe(mergeLeft({ as: ActionItem }), (item) => ({ ...item, key: item.name }))
  );

  return (
    <>
      <Dropdown
        className={styles.dropdown}
        button={({ onClick }) => (
          <button
            onClick={onClick}
            className={styles.actionsBtn}
            aria-label="Меню действия"
          >
            <Icon iconName="threeDots" className={styles.icon} />
          </button>
        )}
      >
        <List list={actions} />
      </Dropdown>
      <DeleteTaskModal
        isOpen={isDeleteTaskModalOpen}
        onClose={() => setIsDeleteTaskModalOpen(false)}
        id={id}
      />
    </>
  );
};
