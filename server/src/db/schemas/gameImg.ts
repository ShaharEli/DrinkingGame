import mongoose, { Schema } from 'mongoose';
import { IGameImg } from '../../types';

const gameImgDbSchema: Schema = new mongoose.Schema(
  {
    img: {
      required: true,
      type: String,
    },
    gameId: {
      ref: 'Game',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    tagged: {
      ref: 'User',
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);

gameImgDbSchema.set('toJSON', {
  transform: (_: any, returnedObject: any) => {
    delete returnedObject.__v;
  },
});

const GameImg = mongoose.model<IGameImg>('Game', gameImgDbSchema);

export default GameImg;
