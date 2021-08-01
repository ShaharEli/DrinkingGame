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

interface Props {
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
  loading?: boolean;
  children: Element;
}

export default function MainBtn({
  style,
  onPress,
  children,
  textStyle,
  loading,
}: Props) {
  const {colors, rootStyles} = useAppSelector(state => state.styles);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        rootStyles.box,
        {backgroundColor: colors.GREEN_PRIMARY},
        rootStyles.alignSelfCenter,
        style,
        styles.container,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.BG} />
      ) : (
        <Text
          style={[
            {color: colors.BG},
            rootStyles.p1,
            textStyle,
            rootStyles.fontSize16,
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
