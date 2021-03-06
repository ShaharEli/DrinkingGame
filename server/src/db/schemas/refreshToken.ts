import mongoose, { Schema } from 'mongoose';
import { IRefreshTokenDoc } from '../../types';

const refreshTokenDbSchema: Schema = new mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: String, required: true },
});

refreshTokenDbSchema.set('toJSON', {
  transform: (_: any, returnedObject: any) => {
    delete returnedObject.__v;
  },
});

const RefreshToken = mongoose.model<IRefreshTokenDoc>(
  'RefreshToken',
  refreshTokenDbSchema
);

export default RefreshToken;
