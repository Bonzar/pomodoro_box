export type TColor =
  // b&w
  | "black"
  | "white"
  | "gray-F5"
  | "gray-F4"
  | "gray-ED"
  | "gray-EC"
  | "gray-E6"
  | "gray-E4"
  | "gray-E3"
  | "gray-C4"
  | "gray-99"
  // green
  | "green-light"
  | "green"
  // red
  | "red-light"
  | "red-semi-light"
  | "red"
  | "red-dark"
  // other
  | "orange"
  | "orange-light"
  | "lavender"
  | "lavender-light"
  | "blue"
  | "blue-light";

// Colors with suffix "-light" that have non-light version
export type TColorLight<Colors = TColor> = Colors extends `${infer R}-light`
  ? R extends TColor
    ? Colors
    : never
  : never;

// Colors that have light version (with suffix "-light")
export type TColorActive<Colors = TColorLight> =
  Colors extends `${infer R}-light` ? R : never;
