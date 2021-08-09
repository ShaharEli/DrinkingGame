import { Request, Response } from 'express';
import FriendRequest from '../db/schemas/friendRequest';
import User from '../db/schemas/user';
import { friendsFields, FriendRequestsStatusEnum, createError } from '../utils';

const FRIENDS_LIMIT = 30;

export const searchFriends = async (req: Request, res: Response) => {
  const { friendUserName = '' } = req.body;
  if (!friendUserName || !req.userName)
    return createError('friendUserName field missing', 400);
  const possibleMatches = await User.find({
    $and: [
      { userName: { $regex: `^${friendUserName}`, $options: 'i' } },
      { _id: { $nin: [req.userId] } },
    ],
  })
    .select(friendsFields)
    .limit(FRIENDS_LIMIT);
  res.json(possibleMatches);
};

export const addFriend = async (req: Request, res: Response) => {
  const { friendUserId = '' } = req.body;
  if (!friendUserId || !req.userName || !req.userId)
    return createError('friendUserName field missing', 400);
  const ids = [req.userId, friendUserId];
  const isFriendRequestExists = await FriendRequest.find({
    $and: [{ from: { $in: ids } }, { to: { $in: ids } }],
  }).lean();

  const friendUser = await User.findById(friendUserId).lean();
  if (!friendUser) {
    return createError('error occurred', 500);
  }
  const io = req.app.get('socketio');

  if (
    isFriendRequestExists.length &&
    // eslint-disable-next-line eqeqeq
    !!isFriendRequestExists.find(({ from }) => from == req.userId)
  )
    return createError('friend request already exists', 400); // TODO check and translate error

  const newfriendRequest = {
    from: req.userId,
    to: friendUserId,
  };
  const newFriendRequestObj = await new FriendRequest(newfriendRequest).save();
  io?.to(friendUser?.socketId).emit('newFriendRequest', newFriendRequestObj);
  res.json(newFriendRequestObj);
};

export const declineFriendRequest = async (req: Request, res: Response) => {
  const { friendRequestId = null } = req.body;
  if (!req.userName || !req.userId || !friendRequestId)
    return createError('friendUserName or friendRequestId field missing', 400);

  const declinedFriendRequest = await FriendRequest.findByIdAndUpdate(
    friendRequestId,
    { status: FriendRequestsStatusEnum.DECLINED },
    { new: true }
  );
  res.json(declinedFriendRequest);
};
export const approveFriendRequest = async (req: Request, res: Response) => {
  const { friendUserId = '', friendRequestId = null } = req.body;
  if (!friendUserId || !req.userName || !req.userId || !friendRequestId)
    return createError('friendUserName or friendRequestId field missing', 400);
  await FriendRequest.findByIdAndUpdate(
    friendRequestId,
    { status: FriendRequestsStatusEnum.APPROVED },
    { new: true }
  );

  const friend = await User.findByIdAndUpdate(
    friendUserId,
    {
      $addToSet: { friends: req.userId },
    },
    { new: true }
  ).populate({ path: 'friends', select: friendsFields });

  const friendFriendRequests = await FriendRequest.find({
    $or: [
      { from: { $in: [friendUserId] } },
      {
        to: { $in: [friendUserId] },
      },
    ],
  }).lean();

  const newUserData = await User.findByIdAndUpdate(
    req.userId,
    {
      $addToSet: { friends: friendUserId },
    },
    { new: true }
  ).populate({ path: 'friends', select: friendsFields });
  const friendRequests = await FriendRequest.find({
    $or: [
      { from: { $in: [req.userId] } },
      {
        to: { $in: [req.userId] },
      },
    ],
  }).lean();
  if (!newUserData) return createError('error occurred', 500);
  delete newUserData.password;

  const io = req.app.get('socketio');
  io?.to(friend?.socketId).emit('friendRequestApproved', {
    ...friend!.toJSON(),
    friendRequests: friendFriendRequests,
  });

  res.json({ ...newUserData.toJSON(), friendRequests });
};

export const searchFromArr = async (req: Request, res: Response) => {
  const { friendsArr } = req.body;
  if (!friendsArr || !Array.isArray(friendsArr) || !friendsArr.length)
    return createError('data invalid', 400);
  const matches = await User.find({
    _id: { $in: friendsArr },
  })
    .select(friendsFields)
    .limit(FRIENDS_LIMIT);
  res.json(matches);
};
