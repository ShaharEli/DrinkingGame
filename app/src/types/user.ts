import {FriendRequestsStatusEnum} from '../utils';
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
  friends: IFriend[];
  isVerified: boolean;
  friendRequests: IFriendRequest[];
}

export interface IFriendRequest {
  from: IFriend;
  to: IFriend;
  _id: string;
  status: keyof typeof FriendRequestsStatusEnum;
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
  | 'friendRequests'
>;
