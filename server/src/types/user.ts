import { Document } from 'mongoose';

export type Lang = 'en' | 'he';
export type UserRole = 'admin' | 'user';

export interface IName {
  firstName: string;
  lastName: string;
}

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
  // eslint-disable-next-line no-use-before-define
  friends: IFriend[] | string[];
  isVerified: boolean;
  password?: string;
}

export type IFriend = Omit<
  IUser,
  | 'friends'
  | 'blocked'
  | 'email'
  | 'isVerified'
  | 'role'
  | 'language'
  | 'updatedAt'
>;

export type IUserKeys = keyof IUser;

type UserDocCompose = Omit<IUser, '_id'>;

export interface IUserDoc extends Document, UserDocCompose {}
