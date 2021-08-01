import React from 'react';
import {Text, TextProps} from 'react-native';
import {useAppSelector} from '../hooks';

interface Props {
  cond: boolean;
  children: React.FC;
  message: string;
  onPress: () => void;
}

export default function If({
  cond,
  children,
  message,
  onPress = () => {},
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
    return null;
  }

  return <>{children}</>;
}
