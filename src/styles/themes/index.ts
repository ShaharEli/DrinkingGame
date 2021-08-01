import {ITheme, Theme} from '../../types';
import lightTheme from './light';
import darkTheme from './dark';
import generalStyle from './general';
import {DEFAULT_THEME} from '../../utils';
export const getTheme = (currentTheme: Theme = DEFAULT_THEME): ITheme => {
  switch (currentTheme) {
    case 'light':
      return {...lightTheme, rootStyles: generalStyle, theme: currentTheme};
    default:
      return {...darkTheme, rootStyles: generalStyle, theme: currentTheme};
  }
};
