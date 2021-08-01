import {createSlice} from '@reduxjs/toolkit';
import {getTheme} from '../../styles/themes';
import {DEFAULT_THEME, getUserTheme, setUserTheme} from '../../utils';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Theme} from '../../types';
import {store} from '../store';

export const getInitialTheme = createAsyncThunk<Theme>(
  'style/getInitialTheme',
  async () => await getUserTheme(),
);
export const toggleTheme = createAsyncThunk<Theme>(
  'style/toggleTheme',
  async () => {
    const currentTheme = store.getState().styles.theme;
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const changed = await setUserTheme(nextTheme);
    if (changed) {
      return nextTheme;
    } else {
      return currentTheme;
    }
  },
);

const styleSlice = createSlice({
  name: 'style',
  initialState: {
    loading: true,
    ...getTheme(DEFAULT_THEME),
  },
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getInitialTheme.fulfilled, (state, action) => {
      const {theme, colors} = getTheme(action.payload);
      state.colors = colors;
      state.theme = theme;
      state.loading = false;
    });
    builder.addCase(getInitialTheme.rejected, state => {
      state.loading = false;
    });
    builder.addCase(toggleTheme.fulfilled, (state, action) => {
      const {theme, colors} = getTheme(action.payload);
      state.colors = colors;
      state.theme = theme;
    });
  },
});

export default styleSlice.reducer;
