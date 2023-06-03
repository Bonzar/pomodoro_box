export const assocKeyAsChildren = <
  Obj extends Record<"children", string | number>
>(
  obj: Obj
) => ({
  ...obj,
  key: obj.children,
});
