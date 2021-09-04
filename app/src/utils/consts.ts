import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
export const MAX_WIDTH = width;
export const MAX_HEIGHT = height;
export const DEFAULT_THEME = 'dark';
export const DEFAULT_LANG = 'he';
export const LOGS_TO_IGNORE = [
  'RCTBridge required dispatch_sync to load RCTDevLoadingView. This may lead to deadlocks',
  'SerializableStateInvariantMiddleware took 103ms',
  'Require cycle: node_modules/react-native/Libraries/Network/fetch',
  'SerializableStateInvariantMiddleware took',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because',
];
export enum FLOATING_BTN_SIZES {
  SMALL = 60,
  NORMAL = 80,
  BIG = 100,
}

export enum FriendRequestsStatusEnum {
  PENDING = 'pending',
  APPROVED = 'approved',
  DECLINED = 'declined',
}

export const AVATAR_SIZE = 100;

export function isIphoneWithNotch() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
}
