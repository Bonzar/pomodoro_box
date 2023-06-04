import styles from "./actions.module.css";
import { Dropdown } from "../../../../../../components/ui/Dropdown";
import { Icon } from "../../../../../../components/ui/Icon/Icon.tsx";
import { TextEl } from "../../../../../../components/ui/TextEl";
import { Indent } from "../../../../../../components/ui/Indent";
import { List } from "../../../../../../components/ui/List";
import { mergeLeft, pipe } from "ramda";
import type { TIcons } from "../../../../../../assets/types/TIcons.ts";

interface IActionsProps {
  id: string;
}

interface IActionItemProps {
  id: string;
  name: string;
  iconName: TIcons;
  onClick?: VoidFunction;
}

const ActionItem = ({ iconName, name, onClick, id }: IActionItemProps) => {
  return (
    <button className={styles.dropdownItem} onClick={onClick}>
      <Icon iconName={iconName} iconColor="green-light" />
      <Indent size={10} inline />
      <TextEl
        textWeight={300}
        textColor="gray-99"
        className={styles.actionText}
      >
        {name} {id}
      </TextEl>
    </button>
  );
};

export const Actions = ({ id }: IActionsProps) => {
  const actions = [
    {
      name: "Увеличить",
      iconName: "plusAction" as const,
    },
    {
      name: "Уменьшить",
      iconName: "minusAction" as const,
    },
    {
      name: "Редактировать",
      iconName: "penAction" as const,
    },
    {
      name: "Удалить",
      iconName: "basketAction" as const,
    },
  ].map(
    pipe(
      mergeLeft({ as: ActionItem, onClick: () => console.log(id) }),
      (item) => ({ ...item, key: item.name })
    )
  );

  return (
    <Dropdown
      className={styles.dropdown}
      button={({ onClick }) => (
        <button onClick={onClick} className={styles.actionsBtn}>
          <Icon iconName="threeDots" iconColor="gray-C4" />
        </button>
      )}
    >
      <List list={actions} />
    </Dropdown>
  );
};
