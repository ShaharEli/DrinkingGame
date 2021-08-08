import { IUser } from '../../src/types';

export const usersToRegisterMock: Partial<IUser>[] = [
  {
    email: 'shahar@shahar.com',
    firstName: 'shahar',
    lastName: 'eliyahu',
    password: '123456',
    language: 'he',
  },
  {
    email: 'tav@tav.com',
    firstName: 'tav',
    lastName: 'tav',
    password: '3343333',
    language: 'en',
  },
  {
    email: 'hello@hello.com',
    firstName: 'hello',
    lastName: 'hello',
    password: '134314343',
    language: 'he',
  },
];
