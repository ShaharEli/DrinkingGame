import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useAppSelector} from '../hooks';
import {FLOATING_BTN_SIZES, MAX_HEIGHT} from '../utils';

interface Props {
  children: JSX.Element;
  onPress?: () => void;
  size?: keyof typeof FLOATING_BTN_SIZES;
}
export default function FloatingBtn({children, onPress, size}: Props) {
  const {colors} = useAppSelector(state => state.styles);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: colors.GREEN_PRIMARY},
        size
          ? {
              width: FLOATING_BTN_SIZES[size],
              height: FLOATING_BTN_SIZES[size],
              borderRadius: FLOATING_BTN_SIZES[size],
            }
          : {},
      ]}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: FLOATING_BTN_SIZES.NORMAL,
    height: FLOATING_BTN_SIZES.NORMAL,
    borderRadius: FLOATING_BTN_SIZES.NORMAL,
    position: 'absolute',
    top: MAX_HEIGHT - 280,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
