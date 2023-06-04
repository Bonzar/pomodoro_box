import styles from "./weekChanger.module.css";
import { TextEl } from "../../../components/ui/TextEl";
import { Icon } from "../../../components/ui/Icon/Icon.tsx";
import type { MouseEvent, PropsWithChildren } from "react";
import { useRef, useState } from "react";
import { getClassName } from "../../../helpers/react/getClassName.ts";
import { Divider } from "../../../components/ui/Divider";
import { stopPropagation } from "../../../helpers/react/stopPropagation.ts";
import { useOutsideClick } from "../../../hooks/useOutsideClick.ts";
import { List } from "../../../components/ui/List";
import { mergeLeft, pipe } from "ramda";

interface IWeekChangerItemProps {
  onClick?: (event: MouseEvent) => void;
}

const WeekChangerItem = ({
  children,
  onClick,
}: PropsWithChildren<IWeekChangerItemProps>) => (
  <button onClick={onClick} className={styles.weekChangerItem}>
    {children}
  </button>
);

export const WeekChanger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const changerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(changerRef, () => setIsOpen(false));

  const handleChangeWeek = (weekIndent: number) => {
    console.log(weekIndent);
  };

  const weeksList = [
    { children: <TextEl>Эта неделя</TextEl>, weekIndent: 0 },
    { children: <TextEl>Прошлая неделя</TextEl>, weekIndent: 1 },
    { children: <TextEl>Две недели назад</TextEl>, weekIndent: 2 },
  ].map(
    pipe(mergeLeft({ as: WeekChangerItem }), ({ weekIndent, ...item }) => ({
      ...item,
      key: weekIndent,
      onClick: () => handleChangeWeek(weekIndent),
    }))
  );

  return (
    <div
      ref={changerRef}
      onClick={stopPropagation(() => setIsOpen(!isOpen))}
      className={getClassName([
        styles.weekChanger,
        isOpen && styles.weekChangerActive,
      ])}
    >
      <WeekChangerItem>
        {weeksList.at(0)?.children}
        <Icon
          className={styles.weekChangerIcon}
          iconName="arrowDown"
          iconColor="red-dark"
        />
      </WeekChangerItem>
      {isOpen && (
        <div className={getClassName([styles.weekChangerItems])}>
          <Divider dividerColor="gray-DE" />
          <List
            divider={() => <Divider dividerColor="gray-DE" />}
            list={weeksList.slice(1)}
          />
        </div>
      )}
    </div>
  );
};
