import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  IApproveFriendRequestPayload,
  IFriendRequest,
  IUser,
  Maybe,
  PassAndEmail,
} from '../../types';
import {
  loginWithToken,
  register,
  loginByPass,
  editUser,
  logout,
  addFriend,
  approveFriendRequest,
  declineFriend,
} from '../../api';

export const loginWithTokenAction = createAsyncThunk<Maybe<IUser>>(
  'user/loginWithTokenAction',
  async () => await loginWithToken(),
);

export const logoutAction = createAsyncThunk<boolean>(
  'user/logoutAction',
  async () => await logout(),
);
export const loginWithPassAction = createAsyncThunk<Maybe<IUser>, PassAndEmail>(
  'user/loginWithPassAction',
  async payload => await loginByPass(payload),
);
export const registerUserAction = createAsyncThunk<
  Maybe<IUser>,
  Partial<IUser>
>('user/registerUserAction', async payload => await register(payload));

export const editUserDataAction = createAsyncThunk<
  Maybe<IUser>,
  Partial<IUser>
>('user/editUserDataAction', async payload => await editUser(payload));

export const addFriendAction = createAsyncThunk<Maybe<IFriendRequest>, string>(
  'user/addFriendAction',
  async payload => await addFriend(payload),
);

export const approveFriendRequestAction = createAsyncThunk<
  Maybe<IUser>,
  IApproveFriendRequestPayload
>(
  'user/approveFriendRequestAction',
  async payload => await approveFriendRequest(payload),
);

export const declineFriendRequestAction = createAsyncThunk<
  Maybe<IFriendRequest>,
  string
>(
  'user/declineFriendRequestAction',
  async payload => await declineFriend(payload),
);
