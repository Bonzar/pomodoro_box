export const getWeekdayDict = (
  isSundayFirstWeekday: boolean,
  isShortNames: boolean
) => {
  const monday = !isShortNames ? "Понедельник" : "Пн";
  const tuesday = !isShortNames ? "Вторник" : "Вт";
  const wednesday = !isShortNames ? "Среда" : "Ср";
  const thursday = !isShortNames ? "Четверг" : "Чт";
  const friday = !isShortNames ? "Пятница" : "Пт";
  const saturday = !isShortNames ? "Суббота" : "Сб";
  const sunday = !isShortNames ? "Воскресенье" : "Вс";

  if (isSundayFirstWeekday) {
    return {
      0: sunday,
      1: monday,
      2: tuesday,
      3: wednesday,
      4: thursday,
      5: friday,
      6: saturday,
    } as const;
  } else {
    return {
      0: monday,
      1: tuesday,
      2: wednesday,
      3: thursday,
      4: friday,
      5: saturday,
      6: sunday,
    } as const;
  }
};
