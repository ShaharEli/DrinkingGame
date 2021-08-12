import mongoose, { Schema } from 'mongoose';
import { IGameDoc } from '../../types';

const gameDbSchema: Schema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['online', 'local'],
      default: 'local',
      required: true,
    },
    creator: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    imgs: {
      default: [],
      ref: 'GameImg',
      type: [mongoose.Schema.Types.ObjectId],
    },
    participants: {
      ref: 'User',
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
    },
  },
  { timestamps: true }
);

gameDbSchema.set('toJSON', {
  transform: (_: any, returnedObject: any) => {
    delete returnedObject.__v;
  },
});

const Game = mongoose.model<IGameDoc>('Game', gameDbSchema);

export default Game;
