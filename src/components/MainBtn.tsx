import React from 'react';
import {Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {useAppSelector} from '../hooks';

interface Props {
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
  children: Element;
}

export default function MainBtn({style, onPress, children, textStyle}: Props) {
  const {colors, rootStyles} = useAppSelector(state => state.styles);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        rootStyles.box,
        {backgroundColor: colors.GREEN_PRIMARY},
        rootStyles.alignSelfCenter,
        style,
      ]}>
      <Text
        style={[
          {color: colors.BG},
          rootStyles.p1,
          textStyle,
          rootStyles.fontSize16,
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
