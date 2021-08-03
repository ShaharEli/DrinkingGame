import React, {useEffect, useRef} from 'react';
import {KeyboardType, TextInput, ViewStyle} from 'react-native';
import {OutlinedTextField as OTF} from '@ubaids/react-native-material-textfield';
import {useAppSelector} from '../hooks';
import {Color} from '../types';

interface Props {
  label: string;
  keyboardType?: null | KeyboardType;
  onChangeText: (t: string) => void;
  error?: string | null;
  secureTextEntry?: boolean;
  ref?: React.RefObject<TextInput>;
  value?: string;
  tintColor?: Color | false;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
}
export default function OutlinedTextField({
  label,
  keyboardType = null,
  onChangeText,
  error = null,
  secureTextEntry = false,
  ref,
  value,
  tintColor,
  style = {},
  containerStyle = {},
}: Props) {
  const {colors} = useAppSelector(state => state.styles);
  const inputRef = useRef<TextInput>();

  useEffect(() => {
    if (value !== undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      inputRef?.current?.setValue(value);
    }
  }, [value, inputRef]);

  return (
    <OTF
      label={label}
      keyboardType={keyboardType}
      error={error}
      style={style}
      containerStyle={containerStyle}
      onChangeText={onChangeText}
      tintColor={tintColor || colors.TEXT_INPUT_LABEL}
      baseColor={colors.INPUT_BASE}
      textColor={colors.font}
      errorColor={colors.RED}
      secureTextEntry={secureTextEntry}
      ref={ref || inputRef}
    />
  );
}
