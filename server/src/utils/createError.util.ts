export const createError = (msg: string, status: number) => {
  // eslint-disable-next-line no-throw-literal
  throw { customMessage: msg, status };
};
