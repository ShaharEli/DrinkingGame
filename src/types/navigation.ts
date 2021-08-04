// import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export type PublicStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type FriendsStackParamList = {
  AddFriend: undefined;
  Social: undefined;
};

export type PrivateStackParamList = {
  Game: undefined;
  Tabs: undefined;
};

export type TabsParamList = {
  Settings: undefined;
  Home: undefined;
  FriendsStack: undefined;
};

export type GameScreenNavigationProp = StackNavigationProp<
  PrivateStackParamList,
  'Game'
>;
export type TabsScreenNavigationProp = StackNavigationProp<
  PrivateStackParamList,
  'Tabs'
>;

export type HomeScreenNavigationProp = BottomTabNavigationProp<
  TabsParamList,
  'Home'
>;

export type SettingsScreenNavigationProp = BottomTabNavigationProp<
  TabsParamList,
  'Settings'
>;

export type SocialScreenNavigationProp = BottomTabNavigationProp<
  FriendsStackParamList,
  'Social'
>;
export type AddFriendScreenNavigationProp = BottomTabNavigationProp<
  FriendsStackParamList,
  'AddFriend'
>;

export type LoginScreenNavigationProp = StackNavigationProp<
  PublicStackParamList,
  'Login'
>;

export type RegisterScreenNavigationProp = StackNavigationProp<
  PublicStackParamList,
  'Register'
>;
