import styles from "./weekChanger.module.css";
import { TextEl } from "../../../components/ui/TextEl";
import { Icon } from "../../../components/ui/Icon/Icon.tsx";
import type { PropsWithChildren } from "react";
import { useRef, useState } from "react";
import { getClassName } from "../../../helpers/react/getClassName.ts";
import { Divider } from "../../../components/ui/Divider";
import { stopPropagation } from "../../../helpers/react/stopPropagation.ts";
import { useOutsideClick } from "../../../hooks/useOutsideClick.ts";
import type { ListItem } from "../../../components/ui/List";
import { List } from "../../../components/ui/List";
import { mergeLeft, pipe } from "ramda";
import { toast } from "sonner";

export type WeekShift = 0 | -1 | -2;

interface IWeekChangerItemProps {
  weekShift: WeekShift;
  onWeekItemClick?: (weekShift: WeekShift) => void;
}

const WeekChangerItem = ({
  children,
  onWeekItemClick,
  weekShift,
}: PropsWithChildren<IWeekChangerItemProps>) => (
  <button
    onClick={() => onWeekItemClick?.(weekShift)}
    className={styles.weekChangerItem}
  >
    {children}
  </button>
);

interface IWeekChangerProps {
  currentWeekShift: WeekShift;
  onWeekShiftChange: (weekShift: WeekShift) => void;
}

export const WeekChanger = ({
  currentWeekShift,
  onWeekShiftChange,
}: IWeekChangerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const changerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(changerRef, () => setIsOpen(false));

  const handleChangeWeek = (weekShift: WeekShift) => {
    onWeekShiftChange(weekShift);
  };

  const weeksList: ListItem<typeof WeekChangerItem>[] = [
    { children: <TextEl>Эта неделя</TextEl>, weekShift: 0 as const },
    { children: <TextEl>Прошлая неделя</TextEl>, weekShift: -1 as const },
    { children: <TextEl>Две недели назад</TextEl>, weekShift: -2 as const },
  ].map(
    pipe(mergeLeft({ as: WeekChangerItem }), (item) => ({
      ...item,
      key: item.weekShift,
      onWeekItemClick: handleChangeWeek,
    }))
  );

  const selectedWeek = weeksList.find(
    (item) => item.weekShift === currentWeekShift
  );

  if (!selectedWeek) {
    toast.error(`Неделя со сдвигом "${currentWeekShift}" не найдена`);
    return null;
  }

  const otherWeeksToSelect = weeksList.filter(
    (item) => item.weekShift !== currentWeekShift
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
      <WeekChangerItem weekShift={selectedWeek.weekShift}>
        {selectedWeek.children}
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
            divider={<Divider dividerColor="gray-DE" />}
            list={otherWeeksToSelect}
          />
        </div>
      )}
    </div>
  );
};
