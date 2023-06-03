export const assocKeyAsId = <Obj extends Record<"id", string | number>>(
  obj: Obj
) => ({
  ...obj,
  key: obj.id,
});
