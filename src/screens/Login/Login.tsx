import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/AntDesign';

const Login = () => {
  return (
    <View style={{marginTop: 100}}>
      <Icon name="home" />

      <Text>Login</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
