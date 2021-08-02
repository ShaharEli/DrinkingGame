import React from 'react';
import {View, Image, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppSelector} from '../hooks';
import {assets, AVATAR_SIZE, MAX_WIDTH} from '../utils';
import {bg} from './themes/general';

export function WidthContainer({children}: {children: Element}) {
  const {rootStyles} = useAppSelector(state => state.styles);
  return (
    <View style={[localStyles.widthContainer, rootStyles.alignSelfCenter]}>
      {children}
    </View>
  );
}
interface DividerProps {
  children?: React.FC;
  m?: number;
  h?: number;
  bg?: string;
  w?: number;
}
export function Divider({
  children,
  m: marginVertical = 0,
  h: height = 0,
  bg: backgroundColor,
  w: width,
}: DividerProps) {
  const {rootStyles} = useAppSelector(state => state.styles);

  return (
    <View
      style={[
        {
          marginVertical,
          height,
          backgroundColor,
          width,
        },
        width ? rootStyles.alignSelfCenter : {},
      ]}>
      {children}
    </View>
  );
}

export function Logo({
  w: width = 200,
  h: height = 200,
  m: margin = 0,
  mv: marginVertical = 0,
  mh: marginHorizontal = 0,
  mt: marginTop = 0,
  mb: marginBottom = 0,
  alsc = true,
  style = {},
}) {
  const {rootStyles} = useAppSelector(state => state.styles);
  return (
    <Image
      source={assets.logo}
      style={[
        {
          width,
          height,
          marginVertical,
          margin,
          marginTop,
          marginBottom,
          marginHorizontal,
        },
        alsc && rootStyles.alignSelfCenter,
        style,
      ]}
    />
  );
}
interface ScreenWrapperProps {
  children: Element;
  style?: ViewStyle;
  withTop?: boolean;
}
export const ScreenWrapper = ({
  children,
  style = {},
  withTop = true,
}: ScreenWrapperProps) => {
  const {top} = useSafeAreaInsets();

  const {colors, rootStyles} = useAppSelector(state => state.styles);
  const getTop = (top: number) => ({paddingTop: top});

  return (
    <View
      style={[
        bg(colors),
        rootStyles.flex1,
        style,
        getTop(withTop ? top : 0) as TextStyle,
      ]}>
      {children}
    </View>
  );
};

interface CircleWrapperProps {
  children: React.FC;
  size: number;
}
export const CircleWrapper = ({
  children,
  size = AVATAR_SIZE,
}: CircleWrapperProps) => {
  const {colors, rootStyles} = useAppSelector(state => state.styles);
  return (
    <View
      style={[
        bg(colors),
        {width: size, height: size, borderRadius: size},
        rootStyles.box,
      ]}>
      {children}
    </View>
  );
};

const localStyles = StyleSheet.create({
  widthContainer: {width: MAX_WIDTH * 0.9, maxWidth: 350},
});
