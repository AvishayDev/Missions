export const randInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getRandomElement = <T>(list: T[]): T | undefined => {
  return list[randInt(0, list.length)];
};
