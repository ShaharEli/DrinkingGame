import { nanoid } from 'nanoid';
import { IName } from '../types';
import User from '../db/schemas/user';

const getUserName = ({ firstName, lastName }: IName) =>
  `${firstName}_${lastName}_${nanoid(4)}`;

export const generateUserName = async ({ firstName, lastName }: IName) => {
  let userName = getUserName({ firstName, lastName });
  // eslint-disable-next-line no-await-in-loop
  while (await User.findOne({ userName })) {
    userName = getUserName({ firstName, lastName });
  }
  return userName;
};
