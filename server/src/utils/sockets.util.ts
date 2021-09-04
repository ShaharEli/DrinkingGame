import { IUser, Maybe } from '../types';

export const getSocketList = (
  users: Maybe<Partial<IUser>>[],
  user?: string
) => {
  users
    .map((p) => {
      if (!p) return null;
      if (p.socketId) {
        if (user) {
          if (p._id === user) return null;
        }
        return p.socketId;
      }
      return null;
    })
    .filter((p: Maybe<string>) => !!p);
};
