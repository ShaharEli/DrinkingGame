import mongoose, { Schema } from 'mongoose';
import { IFriendRequestDoc } from '../../types';
import { FriendRequestsStatusEnum } from '../../utils';

const friendRequestDbSchema: Schema = new mongoose.Schema(
  {
    from: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true },
    to: { ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      required: true,
      default: FriendRequestsStatusEnum.SENT,
      enum: Object.keys(FriendRequestsStatusEnum),
    },
  },
  { timestamps: true }
);

friendRequestDbSchema.set('toJSON', {
  transform: (_: any, returnedObject: any) => {
    delete returnedObject.__v;
  },
});

const FriendRequest = mongoose.model<IFriendRequestDoc>(
  'FriendRequest',
  friendRequestDbSchema
);

export default FriendRequest;
