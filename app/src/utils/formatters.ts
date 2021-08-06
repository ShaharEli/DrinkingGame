export const varToString = (varible: Record<string, any>): string =>
  Object.keys(varible)[0];

export const pickRandomListValue = (list: any[]) =>
  list[Math.floor(Math.random() * list.length)];

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const titelize = (s: string) =>
  s
    .split(' ')
    .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(' ');
