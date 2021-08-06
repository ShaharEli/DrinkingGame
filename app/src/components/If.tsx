import React from 'react';
import {Text, View, ViewStyle} from 'react-native';
import {useAppSelector} from '../hooks';

interface Props {
  cond: boolean;
  children: JSX.Element;
  message?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function If({
  cond,
  children,
  message,
  style = {},
  onPress = () => null,
}: Props) {
  const {rootStyles, colors} = useAppSelector(state => state.styles);

  if (!cond) {
    if (message) {
      return (
        <Text
          onPress={onPress}
          style={[rootStyles.alignSelfCenter, {color: colors.font}]}>
          {message}
        </Text>
      );
    }
    return style ? <View style={style} /> : null;
  }

  return <>{children}</>;
}
