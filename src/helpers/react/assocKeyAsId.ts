export const assocKeyAsId = <Obj extends Record<"id", string | number>>(
  obj: Obj
) => {
  return {
    ...obj,
    key: obj.id,
  };
};
