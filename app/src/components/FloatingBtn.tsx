import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useAppSelector} from '../hooks';
import {FLOATING_BTN_SIZE, MAX_HEIGHT} from '../utils';
interface Props {
  children: JSX.Element;
  onPress: () => void;
}
export default function FloatingBtn({children, onPress}: Props) {
  const {colors} = useAppSelector(state => state.styles);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {backgroundColor: colors.GREEN}]}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: FLOATING_BTN_SIZE,
    height: FLOATING_BTN_SIZE,
    borderRadius: FLOATING_BTN_SIZE,
    position: 'absolute',
    top: MAX_HEIGHT - 280,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
