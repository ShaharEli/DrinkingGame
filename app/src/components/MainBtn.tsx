import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {useAppSelector} from '../hooks';
import {Maybe} from '../types';

interface Props {
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
  loading?: boolean;
  children?: Maybe<string | undefined> | Maybe<string | undefined>[];
  disabled?: boolean;
}

export default function MainBtn({
  style = {},
  onPress,
  children,
  textStyle,
  loading,
  disabled = false,
}: Props): JSX.Element {
  const {colors, rootStyles} = useAppSelector(state => state.styles);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      style={[
        rootStyles.box,
        {backgroundColor: colors.GREEN_PRIMARY},
        rootStyles.alignSelfCenter,
        styles.container,
        disabled ? {backgroundColor: colors.INACTIVE_TINT} : {},
        style,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.BG} />
      ) : (
        <Text
          style={[
            {color: colors.BG},
            rootStyles.p1,
            rootStyles.fontSize16,
            textStyle,
          ]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 40,
    borderRadius: 18,
  },
});
