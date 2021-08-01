import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
export const MAX_WIDTH = width;
export const MAX_HEIGHT = height;
export const DEFAULT_THEME = 'dark';
export const DEFAULT_LANG = 'he';
export const LOGS_TO_IGNORE = [
  'RCTBridge required dispatch_sync to load RCTDevLoadingView. This may lead to deadlocks',
];
