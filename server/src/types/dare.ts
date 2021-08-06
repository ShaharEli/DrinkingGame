import { Document } from 'mongoose';
import { Lang } from './user';

export type DareType = 'question' | 'dare';
export interface IDare {
  type: DareType;
  text: string;
  img: string;
  punishment: string;
  language: Lang;
  _id: string;
  updatedAt: Date;
  createdAt: Date;
}
export interface IDareDoc extends Document, Omit<IDare, '_id'> {}
