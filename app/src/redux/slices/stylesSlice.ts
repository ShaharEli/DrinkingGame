import {createSlice} from '@reduxjs/toolkit';
import {getTheme} from '../../styles/themes';
import {DEFAULT_THEME} from '../../utils';
import {getInitialThemeAction, toggleThemeAction} from '../actions';

const styleSlice = createSlice({
  name: 'style',
  initialState: {
    loadingTheme: true,
    ...getTheme(DEFAULT_THEME),
  },
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getInitialThemeAction.fulfilled, (state, action) => {
      const {theme, colors} = getTheme(action.payload);
      state.colors = colors;
      state.theme = theme;
      state.loadingTheme = false;
    });
    builder.addCase(getInitialThemeAction.rejected, state => {
      state.loadingTheme = false;
    });
    builder.addCase(toggleThemeAction.fulfilled, (state, action) => {
      const {theme, colors} = getTheme(action.payload);
      state.colors = colors;
      state.theme = theme;
    });
  },
});

export default styleSlice.reducer;
