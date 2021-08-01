import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {IUser, MaybeUser, PassAndPhone} from '../../types';
import {
  loginWithToken as initialLogin,
  register as registerUser,
  loginByPass as login,
} from '../../api';

export const loginWithToken = createAsyncThunk<MaybeUser>(
  'user/loginWithToken',
  async () => await initialLogin(),
);
export const loginWithPass = createAsyncThunk<MaybeUser, PassAndPhone>(
  'user/loginWithPass',
  async payload => await login(payload),
);
export const register = createAsyncThunk<MaybeUser, Partial<IUser>>(
  'user/register',
  async payload => await registerUser(payload),
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
    builder.addCase(register.fulfilled, (state, action) => {
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
    builder.addCase(loginWithToken.pending, state => {
      state.loadingAuth = true;
    });
    builder.addCase(register.pending, state => {
      state.loadingAuth = true;
    });
    builder.addCase(loginWithPass.pending, state => {
      state.loadingAuth = true;
    });
  },
});

export default userSlice.reducer;
