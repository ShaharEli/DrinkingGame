import { Document } from 'mongoose';
import { FriendRequestsStatusEnum } from '../utils';
import { ValueOf } from './common';

export interface IFriendRequest {
  from: string;
  to: string;
  _id: string;
  status: ValueOf<FriendRequestsStatusEnum>;
}

export interface IFriendRequestDoc
  extends Document,
    Omit<IFriendRequest, '_id'> {}
