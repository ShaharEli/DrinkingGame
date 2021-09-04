import {IFriend} from './user';

 export enum GameTypes {
  Local = 'local',
  Online = 'online',
}
export interface IGame {
  type: `${GameTypes}`;
  participants: IFriend[];
  imgs: string[];
  _id: string;
  updatedAt: Date;
  createdAt: Date;
  creator: string;
  status:`${GameStatuses}`; //template literal error in eslint
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
  type:`${GameTypes}`;
}

export interface IGameImgPayload {
  gameId: string;
  dareId: string;
  img: string;
  tagged?: string[];
}


export enum GameStatuses {
  IN_PROGRESS = 'in-progress',
  FINISHED = 'finished',
}
