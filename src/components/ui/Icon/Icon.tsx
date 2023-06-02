import * as icons from "../../../assets/icons";
import type { TColor } from "../../../assets/types/TColor.ts";
import type { TIcons } from "../../../assets/types/TIcons.ts";
import type { InheritableElementProps } from "../../../assets/types/PolymorphicComponent.ts";

interface IIconProps {
  iconName: TIcons;
  iconColor?: TColor;
}

type IconProps = InheritableElementProps<"svg", IIconProps>;

export const Icon = ({ iconName, iconColor, ...other }: IconProps) => {
  const Icon = icons[iconName];
  return <Icon fill={iconColor && `var(--${iconColor})`} {...other} />;
};
