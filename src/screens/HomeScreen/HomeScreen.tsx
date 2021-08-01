import React from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {toggleTheme, getInitialTheme} from '../../redux/slices';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const {theme, rootStyles, colors} = useAppSelector(state => state.styles);

  useEffect(() => {
    dispatch(getInitialTheme());
  }, [dispatch]);
  console.log(theme);
  return (
    <View style={{backgroundColor: colors.bg, marginTop: 100}}>
      <Text
        onPress={() => {
          dispatch(toggleTheme());
        }}
        style={[rootStyles.mt5, {color: colors.font}]}>
        {theme}
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
