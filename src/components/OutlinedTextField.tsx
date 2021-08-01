import React from 'react';
import {KeyboardType, StyleSheet, TextInput} from 'react-native';
import {OutlinedTextField as OTF} from '@ubaids/react-native-material-textfield';
import {useAppSelector} from '../hooks';

interface Props {
  label: string;
  keyboardType?: null | KeyboardType;
  onChangeText: (t: string) => void;
  error?: string | null;
  secureTextEntry?: boolean;
  ref?: React.RefObject<TextInput>;
}
export default function OutlinedTextField({
  label,
  keyboardType = null,
  onChangeText,
  error = null,
  secureTextEntry = false,
  ref,
}: Props) {
  const {colors} = useAppSelector(state => state.styles);

  return (
    <OTF
      label={label}
      keyboardType={keyboardType}
      error={error}
      onChangeText={onChangeText}
      tintColor={colors.TEXT_INPUT_LABEL}
      baseColor={colors.INPUT_BASE}
      textColor={colors.font}
      errorColor={colors.RED}
      secureTextEntry={secureTextEntry}
      ref={ref}
    />
  );
}

const styles = StyleSheet.create({});
