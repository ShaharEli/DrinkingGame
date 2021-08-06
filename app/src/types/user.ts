import {Lang} from './lang';
export type UserRole = 'admin' | 'user';

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
  role: UserRole;
  blocked: IUser[] | string[];
  friends: Omit<
    IUser,
    'friends' | 'blocked' | 'email' | 'isVerified' | 'role' | 'language'
  >[];
  isVerified: boolean;
}
