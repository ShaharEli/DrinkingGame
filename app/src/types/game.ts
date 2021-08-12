import {IFriend} from './user';

export type GameType = 'online' | 'local';

export interface IGame {
  type: GameType;
  participants: IFriend[];
  imgs: string[];
  _id: string;
  updatedAt: Date;
  createdAt: Date;
  creator: string;
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

export interface IParticipantsPayload {
  participants: string[];
  gameId: string;
}
export interface IGamePayload {
  participants: string[];
  type: GameType;
}

export interface IGameImgPayload {
  gameId: string;
  dareId: string;
  img: string;
  tagged?: string[];
}
