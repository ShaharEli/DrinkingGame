import { Document } from 'mongoose';
import { IFriend } from './user';

export enum GameStatuses {
  IN_PROGRESS = 'in-progress',
  FINISHED = 'finished',
}
export enum GameTypes {
  Local = 'local',
  Online = 'online',
}
export interface IGame {
  type: `${GameTypes}`;
  participants: IFriend[] | string[];
  imgs: string[];
  _id: string;
  updatedAt: Date;
  createdAt: Date;
  creator: string;
  status: `${GameStatuses}`;
}

export interface IGameImg {
  img: string;
  _id: string;
  gameId: string;
  tagged: string[];
  updatedAt: Date;
  createdAt: Date;
  dareId: string;
}

export interface IGameImgDoc extends Document, Omit<IGameImg, '_id'> {}

export interface IGameDoc extends Document, Omit<IGame, '_id'> {}
