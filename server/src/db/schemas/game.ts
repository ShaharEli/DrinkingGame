import mongoose, { Schema } from 'mongoose';
import { GameStatuses, GameTypes, IGameDoc } from '../../types';

const gameDbSchema: Schema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(GameTypes),
      default: GameTypes.Local,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(GameStatuses),
      default: GameStatuses.IN_PROGRESS,
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
