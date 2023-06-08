import type { ElementType, ReactElement, ReactNode } from "react";
import type { PolymorphicComponentProps } from "../../../assets/types/PolymorphicComponent.ts";
import { intersperse } from "ramda";

interface IListItem {
  key: string | number;
  children?: ReactNode;
}

type ListItemProps<C extends ElementType = ElementType> =
  PolymorphicComponentProps<C, IListItem>;

interface IListProps {
  list: ListItemProps[];
  divider?: ReactElement;
}

export type ListItem<C extends ElementType> = Omit<ListItemProps<C>, "as"> &
  Required<Pick<ListItemProps<C>, "as">>;

export const List = ({ list, divider }: IListProps) => {
  let currentList = list;

  type ListItemType = (typeof list)[number];

  if (divider) {
    const dividerEl = () => divider;

    currentList = intersperse<
      Omit<ListItemType, "key"> | Omit<ListItem<typeof dividerEl>, "key">
    >({ as: dividerEl }, list).map((item, index, array) => {
      const key =
        index % 2 === 1 // check on divider
          ? // if divider -> use key from prev item + "_divider"
            (array[index - 1] as ListItemType).key + "_divider"
          : (item as ListItemType).key;

      return { ...item, key };
    });
  }

  return (
    <>
      {currentList.map(({ key, as, children, ...other }) => {
        const Component = as || "div";

        return (
          <Component key={key} {...other}>
            {children}
          </Component>
        );
      })}
    </>
  );
};
