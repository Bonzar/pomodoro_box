import * as icons from "../../../assets/icons";
import type { TColor } from "../../../assets/types/TColor.ts";
import type { TIcons } from "../../../assets/types/TIcons.ts";
import type { InheritableElementProps } from "../../../assets/types/PolymorphicComponent.ts";

interface IIconProps {
  iconName: TIcons;
  iconColor?: TColor;
}

type IconProps = InheritableElementProps<"svg", IIconProps>;

export const Icon = ({ iconName, iconColor, style, ...other }: IconProps) => {
  const Icon = icons[iconName];

  let iconStyle = style ?? {};
  if (iconColor) {
    iconStyle = { ...iconStyle, color: `var(--${iconColor})` };
  }

  return <Icon style={iconStyle} {...other} />;
};
