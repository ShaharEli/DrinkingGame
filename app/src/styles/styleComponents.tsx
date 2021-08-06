import React from 'react';
import {ImageStyle} from 'react-native';
import {View, Image, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppSelector} from '../hooks';
import {assets, AVATAR_SIZE, MAX_WIDTH} from '../utils';
import {bg} from './themes/general';

export function WidthContainer({
  children,
  style,
}: {
  children: JSX.Element | JSX.Element[];
  style?: ViewStyle;
}): JSX.Element {
  const {rootStyles} = useAppSelector(state => state.styles);
  return (
    <View
      style={[
        localStyles.widthContainer,
        rootStyles.alignSelfCenter,
        style || {},
      ]}>
      {children}
    </View>
  );
}
interface DividerProps {
  children?: JSX.Element;
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
}: DividerProps): JSX.Element {
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
interface LogoProps {
  w?: number;
  h?: number;
  m?: number;
  mv?: number;
  mh?: number;
  mt?: number;
  mb?: number;
  alsc?: boolean;
  style?: ImageStyle;
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
}: LogoProps): JSX.Element {
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
        alsc ? (rootStyles.alignSelfCenter as ImageStyle) : {},
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
}: ScreenWrapperProps): JSX.Element => {
  const {top} = useSafeAreaInsets();

  const {colors, rootStyles} = useAppSelector(state => state.styles);
  const getTop = (num: number) => ({paddingTop: num});

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
  children: JSX.Element;
  size: number;
}
export const CircleWrapper = ({
  children,
  size = AVATAR_SIZE,
}: CircleWrapperProps): JSX.Element => {
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
