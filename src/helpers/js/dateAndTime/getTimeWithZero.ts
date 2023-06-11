export const getTimeWithZero = (time: number) =>
  time < 10 ? `0${time}` : time;
