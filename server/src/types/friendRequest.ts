import { Document } from 'mongoose';
import { FriendRequestsStatusEnum } from '../utils';
import { IFriend } from './user';

export interface IFriendRequest {
  from: IFriend;
  to: IFriend;
  _id: string;
  status: keyof typeof FriendRequestsStatusEnum;
}

export interface IFriendRequestDoc
  extends Document,
    Omit<IFriendRequest, '_id'> {}
