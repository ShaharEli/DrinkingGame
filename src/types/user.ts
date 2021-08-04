import {Lang} from './lang';

export interface IUser {
  firstName: string;
  lastName: string;
  _id: string;
  isActive: boolean;
  lastConnected: Date;
  updatedAt: Date;
  createdAt: Date;
  avatar: string;
  socketId: string;
  email: string;
  language: Lang;
  userName: string;
  firebaseToken?: string;
  role: 'admin' | 'user';
  blocked: IUser[] | string[];
  friends: Omit<
    IUser,
    'friends' | 'blocked' | 'email' | 'isVerified' | 'role' | 'language'
  >[];
  isVerified: boolean;
}
