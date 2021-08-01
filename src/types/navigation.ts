// import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type PublicStackParamList = {
    Login: {};
    Register: {};
};

export type PrivateStackParamList = {
 
  Home: {};

  };
  

export type HomeScreenNavigationProp = StackNavigationProp<
PrivateStackParamList,
  'Home'
>;


  
  export type LoginScreenNavigationProp = StackNavigationProp<
  PublicStackParamList,
  'Login'
>;

export type RegisterScreenNavigationProp = StackNavigationProp<
PublicStackParamList,
  'Register'
>;