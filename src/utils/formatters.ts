export const varToString = (varible: Record<string, any>): string =>
  Object.keys(varible)[0];

export const pickRandomListValue = (list: any[]) =>
  list[Math.floor(Math.random() * list.length)];
