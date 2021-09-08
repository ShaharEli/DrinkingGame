import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';

export type PublicStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type FriendsStackParamList = {
  AddFriend: undefined;
  Social: undefined;
  FriendRequests: undefined;
};

export type PrivateStackParamList = {
  LocalGame: undefined;
  OnlineGame: undefined;
  Tabs: undefined;
  CreateGame: undefined;
  AddImgScreen: {img: string; dareId: string};
};

export type TabsParamList = {
  Settings: undefined;
  Home: undefined;
  FriendsStack: undefined;
};
export type AddImageScreenRouteProps = RouteProp<
  PrivateStackParamList,
  'AddImgScreen'
>;

export type LocalGameScreenNavigationProp = StackNavigationProp<
  PrivateStackParamList,
  'LocalGame'
>;
export type OnlineGameScreenNavigationProp = StackNavigationProp<
  PrivateStackParamList,
  'OnlineGame'
>;

export type CreateGameNavigationProp = StackNavigationProp<
  PrivateStackParamList,
  'CreateGame'
>;
export type TabsScreenNavigationProp = StackNavigationProp<
  PrivateStackParamList,
  'Tabs'
>;

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabsParamList, 'Home'>,
  StackNavigationProp<PrivateStackParamList>
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
