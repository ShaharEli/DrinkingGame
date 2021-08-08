import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import Error from '../db/schemas/error';
import FriendRequest from '../db/schemas/friendRequest';
import RefreshToken from '../db/schemas/refreshToken';
import User from '../db/schemas/user';
import Logger from '../logger/logger';
import { IUser, IUserKeys } from '../types';
import {
  friendsFields,
  generateUserName,
  createError,
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from '../utils';
import { userValidationSchema } from '../validations/user';

export const logErrorToService = async (req: Request, res: Response) => {
  const { info, platform, user, error } = req.body;
  const payload = {
    info: JSON.stringify(error),
    platform,
    user,
    error: JSON.stringify(error),
  };
  if (!user) delete payload.user;
  if (!user && !info && !error) createError('not enough data provided', 400);
  // TODO validation
  const newError = new Error(payload);
  const savedError = await newError.save();
  res.json({ created: savedError });
};

export const login = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  if (!password || !email) createError('content missing', 400);
  const user = await User.findOne({
    email: { $regex: `^${email}$`, $options: 'i' }, // TODO check
  }).populate({
    path: 'friends',
    select: friendsFields,
  });
  if (!user) return createError('error occurred', 500);
  const isPassOk = bcrypt.compareSync(password, user.password!);
  if (!isPassOk) createError('One of the fields incorrect', 500); // TODO better response
  delete user?.password;
  const accessToken = generateAccessToken(user._id, user.userName, user.role);
  const refreshToken = await generateRefreshToken(
    user._id,
    user.userName,
    user.role
  );
  const friendRequests = await FriendRequest.find({
    $or: [
      { from: { $in: [user._id] } },
      {
        to: { $in: [user._id] },
      },
    ],
  });
  res.json({ accessToken, refreshToken, user: { ...user, friendRequests } });
};

export const loginWithToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) createError('token missing', 400);
  const data = verifyRefreshToken(refreshToken);
  if (!data) return createError('token missing', 400);
  const { userId } = data;
  if (!userId) createError('invalid token', 400);
  const user = await User.findById(userId)
    .populate({
      path: 'friends',
      select: friendsFields,
    })
    .lean();

  if (!user) return createError('error occurred', 500);
  const friendRequests = await FriendRequest.find({
    $or: [
      { from: { $in: [userId] } },
      {
        to: { $in: [userId] },
      },
    ],
  });
  delete user.password;
  const accessToken = generateAccessToken(userId, user.userName, user.role);
  res.json({ user: { ...user, friendRequests }, accessToken });
};

export const editUser = async (req: Request, res: Response) => {
  const {
    firstName = null,
    lastName = null,
    language = null,
    avatar = null,
    userName = null,
  } = req.body;
  const payload: Partial<IUser> = {
    firstName,
    lastName,
    language,
    avatar,
    userName,
  };
  Object.keys(payload).forEach((key) => {
    if (payload[key as IUserKeys] === null) {
      delete payload[key as IUserKeys];
    }
  });

  if (!Object.keys(payload).length) createError('data missing', 400);
  const user = await User.findByIdAndUpdate(req.userId, payload, {
    new: true,
  })
    .populate({
      path: 'friends',
      select: friendsFields,
    })
    .lean();
  if (!user) return createError('error occurred', 400);

  const friendRequests = await FriendRequest.find({
    $or: [
      { from: { $in: [user._id] } },
      {
        to: { $in: [user._id] },
      },
    ],
  });
  delete user.password;
  res.json({ ...user, friendRequests });
};

export const verifyMail = async () => {};

export const register = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    avatar = null,
    email,
    password,
    language,
  } = req.body;
  const payload: Partial<IUser> = {
    firstName,
    lastName,
    avatar,
    email,
    password,
    language,
  };
  if (!avatar) delete payload.avatar;
  try {
    await userValidationSchema.validateAsync(payload);
    const isUserExists = await User.findOne({ email, isVerified: true });
    if (isUserExists) createError('error occurred', 400);
    const passwordHash = bcrypt.hashSync(payload.password!, 8);
    payload.password = passwordHash;
    payload.userName = await generateUserName({ firstName, lastName });
    const newUser = new User(payload);
    const user = await newUser.save();
    const accessToken = generateAccessToken(
      user._id,
      newUser.userName,
      newUser.role
    );
    const refreshToken = await generateRefreshToken(
      user._id,
      newUser.userName,
      newUser.role
    );
    delete user.password;
    // TODO send mail
    res.json({
      user: { ...user, friendRequests: [] },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    Logger.error(err);
    createError('error occurred', 400);
  }
};

export const checkIfUserNameIsValid = async (req: Request, res: Response) => {
  const { userName } = req.body;
  if (userName?.length < 6) return res.json({ ok: false });
  const isUserExists = await User.findOne({ userName });
  if (isUserExists) return res.json({ ok: false });
  return res.json({ ok: true });
};

export const getToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) createError('token missing', 400);
  const data = verifyRefreshToken(refreshToken);
  if (!data) return createError('token invalid', 400);

  const { userId, userName, role } = data;
  const accessToken = generateAccessToken(userId, userName, role);
  res.json({ accessToken });
};

export const logout = async (req: Request, res: Response) => {
  const { userId } = req;
  const user = await User.findByIdAndUpdate(userId, {
    isActive: false,
    lastConnected: new Date(),
  });
  if (!user) return createError('error occurred', 500);
  await RefreshToken.deleteMany({ userId });
  res.json({ success: true });
};
