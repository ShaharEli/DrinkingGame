import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../types';
import {socketController} from '../../api';
import {
  addFriendAction,
  approveFriendRequestAction,
  declineFriendRequestAction,
  editUserDataAction,
  loginWithPassAction,
  loginWithTokenAction,
  logoutAction,
  registerUserAction,
} from '../actions';

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
    setUser<IUser>(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(loginWithTokenAction.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isSignedIn = true;
      }
      state.loadingAuth = false;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isSignedIn = true;
      }
      state.loadingAuth = false;
    });
    builder.addCase(loginWithPassAction.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isSignedIn = true;
      }
      state.loadingAuth = false;
    });

    builder.addCase(editUserDataAction.fulfilled, (state, action) => {
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

    builder.addCase(loginWithTokenAction.pending, state => {
      state.loadingAuth = true;
    });
    builder.addCase(registerUserAction.pending, state => {
      state.loadingAuth = true;
    });
    builder.addCase(loginWithPassAction.pending, state => {
      state.loadingAuth = true;
    });

    builder.addCase(logoutAction.pending, state => {
      state.loadingAuth = true;
    });

    builder.addCase(editUserDataAction.pending, state => {
      state.loadingAuth = true;
    });
  },
});

export default userSlice.reducer;
export const {addFriendRequest, setUser} = userSlice.actions;
