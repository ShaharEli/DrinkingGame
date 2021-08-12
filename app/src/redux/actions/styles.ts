import {getUserTheme, setUserTheme} from '../../utils';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Theme} from '../../types';
import {store} from '../store';

export const getInitialThemeAction = createAsyncThunk<Theme>(
  'style/getInitialThemeAction',
  async () => await getUserTheme(),
);
export const toggleThemeAction = createAsyncThunk<Theme>(
  'style/toggleThemeAction',
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
