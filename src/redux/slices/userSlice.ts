import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {IUser, Maybe, PassAndEmail} from '../../types';
import {
  loginWithToken as initialLogin,
  register,
  loginByPass as login,
  editUser,
} from '../../api';

export const loginWithToken = createAsyncThunk<Maybe<IUser>>(
  'user/loginWithToken',
  async () => await initialLogin(),
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loadingAuth: true,
    user: {} as IUser,
    isSignedIn: false,
  },
  reducers: {},

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
    builder.addCase(loginWithToken.pending, state => {
      state.loadingAuth = true;
    });
    builder.addCase(registerUser.pending, state => {
      state.loadingAuth = true;
    });
    builder.addCase(loginWithPass.pending, state => {
      state.loadingAuth = true;
    });

    builder.addCase(editUserData.pending, state => {
      state.loadingAuth = true;
    });
  },
});

export default userSlice.reducer;
