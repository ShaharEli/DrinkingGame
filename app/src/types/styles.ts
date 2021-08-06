export type Theme = 'dark' | 'light';
import generalStyles from '../styles/themes/general';
import themeExample from '../styles/themes/dark';

export type Colors = typeof themeExample.colors;

export type Color = keyof Colors;

export type RootStyles = typeof generalStyles;
export interface ITheme {
  theme: Theme;
  colors: Colors;
  rootStyles: RootStyles;
}
