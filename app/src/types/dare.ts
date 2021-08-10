import {Lang} from './lang';

export type DareType = 'question' | 'dare';
export interface IDare {
  type: DareType;
  text: string;
  img?: string;
  punishment: string;
  language: Lang;
  _id: string;
  updatedAt: Date;
  createdAt: Date;
}
