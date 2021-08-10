import { Document } from 'mongoose';
import { IFriend } from './user';

export type GameType = 'online' | 'local';

export interface IGame {
  type: GameType;
  participants: IFriend[] | string[];
  imgs: string[];
  _id: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IGameImg {
  img: string;
  _id: string;
  gameId: string;
  tagged: string[];
  updatedAt: Date;
  createdAt: Date;
}

export interface IGameImgDoc extends Document, Omit<IGameImg, '_id'> {}

export interface IGameDoc extends Document, Omit<IGame, '_id'> {}
