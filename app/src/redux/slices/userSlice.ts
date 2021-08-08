import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {IFriendRequest, IUser, Maybe, PassAndEmail} from '../../types';
import {
  loginWithToken as initialLogin,
  register,
  loginByPass as login,
  editUser,
  logout,
  socketController,
  addFriend,
  approveFriendRequest,
  declineFriend,
} from '../../api';

export const loginWithToken = createAsyncThunk<Maybe<IUser>>(
  'user/loginWithToken',
  async () => await initialLogin(),
);

export const logoutAction = createAsyncThunk<boolean>(
  'user/logoutAction',
  async () => await logout(),
);
export const loginWithPass = createAsyncThunk<Maybe<IUser>, PassAndEmail>(
  'user/loginWithPass',
  async payload => await login(payload),
);
export const registerUser = createAsyncThunk<Maybe<IUser>, Partial<IUser>>(
  'user/registerUser',
  async payload => await register(payload),
);

export const editUserData = createAsyncThunk<Maybe<IUser>, Partial<IUser>>(
  'user/editUserData',
  async payload => await editUser(payload),
);

export const addFriendAction = createAsyncThunk<Maybe<IFriendRequest>, string>(
  'user/addFriendAction',
  async payload => await addFriend(payload),
);

export const approveFriendRequestAction = createAsyncThunk<
  Maybe<IUser>,
  string
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loadingAuth: true,
    user: {} as IUser,
    isSignedIn: false,
  },
  reducers: {
    addFriendRequest<IFriendRequest>(
      state,
      action: PayloadAction<IFriendRequest>,
    ) {
      state.user.friendRequests = [
        ...state.user.friendRequests,
        action.payload,
      ];
    },
  },

  extraReducers: builder => {
    builder.addCase(loginWithToken.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isSignedIn = true;
      }
      state.loadingAuth = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isSignedIn = true;
      }
      state.loadingAuth = false;
    });
    builder.addCase(loginWithPass.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isSignedIn = true;
      }
      state.loadingAuth = false;
    });

    builder.addCase(editUserData.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
      state.loadingAuth = false;
    });

    builder.addCase(logoutAction.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = {} as IUser;
        state.isSignedIn = false;
        socketController.disconnect();
      }
      state.loadingAuth = false;
    });

    builder.addCase(addFriendAction.fulfilled, (state, action) => {
      if (action.payload) {
        state.user.friendRequests = [
          ...state.user.friendRequests,
          action.payload,
        ];
      }
      state.loadingAuth = false;
    });

    builder.addCase(approveFriendRequestAction.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
      state.loadingAuth = false;
    });

    builder.addCase(declineFriendRequestAction.fulfilled, (state, action) => {
      if (action.payload) {
        const friendRequestIndex = state.user.friendRequests.findIndex(
          ({_id}) => _id === action.payload?._id,
        );
        if (friendRequestIndex === -1) return;

        state.user.friendRequests[friendRequestIndex] = action.payload;
      }
      state.loadingAuth = false;
    });

    builder.addCase(addFriendAction.pending, state => {
      state.loadingAuth = true;
    });
    builder.addCase(approveFriendRequestAction.pending, state => {
      state.loadingAuth = true;
    });
    builder.addCase(declineFriendRequestAction.pending, state => {
      state.loadingAuth = true;
    });

    builder.addCase(loginWithToken.pending, state => {
      state.loadingAuth = true;
    });
    builder.addCase(registerUser.pending, state => {
      state.loadingAuth = true;
    });
    builder.addCase(loginWithPass.pending, state => {
      state.loadingAuth = true;
    });

    builder.addCase(logoutAction.pending, state => {
      state.loadingAuth = true;
    });

    builder.addCase(editUserData.pending, state => {
      state.loadingAuth = true;
    });
  },
});

export default userSlice.reducer;
export const {addFriendRequest} = userSlice.actions;
