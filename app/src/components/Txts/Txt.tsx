import React, {useMemo} from 'react';
import {Text, TextStyle} from 'react-native';
import {useAppSelector} from '../../hooks';
import {font} from '../../styles/themes/general';
import {Color, Maybe} from '../../types';

interface Props {
  style?: TextStyle | TextStyle[];
  children?: Maybe<string | undefined> | Maybe<string | undefined>[];
  size?: number;
  color?: Color;
  onPress?: () => void;
}
const Txt = ({style, children, size, color, onPress}: Props): JSX.Element => {
  const {colors} = useAppSelector(state => state.styles);

  const renderStyle = useMemo(() => {
    const fontSize = size ? {fontSize: size} : {};
    const txtColor = color ? {color} : font(colors);
    const baseStyle = {textAlign: 'left' as const};
    if (!style) return [txtColor, fontSize, baseStyle];
    return Array.isArray(style)
      ? [...style, txtColor, fontSize, baseStyle]
      : [txtColor, style, fontSize, baseStyle];
  }, [style, colors, size, color]);

  return (
    <Text onPress={onPress} style={renderStyle}>
      {children}
    </Text>
  );
};

export default Txt;
