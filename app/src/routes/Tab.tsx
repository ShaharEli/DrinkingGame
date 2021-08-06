import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FriendsStackParamList, TabsParamList} from '../types';
import HomeScreen from '../screens/Home/Home';
import Social from '../screens/Social/Social';
import Settings from '../screens/Settings/Settings';
import {useAppSelector} from '../hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {createStackNavigator} from '@react-navigation/stack';
import AddFriend from '../screens/AddFriend/AddFriend';

const BottomTabNavigator = createBottomTabNavigator<TabsParamList>();
const FriendsStackNavigator = createStackNavigator<FriendsStackParamList>();

const FriendsStack = (): JSX.Element => {
  return (
    <FriendsStackNavigator.Navigator screenOptions={{headerShown: false}}>
      <FriendsStackNavigator.Screen name="Social" component={Social} />
      <FriendsStackNavigator.Screen name="AddFriend" component={AddFriend} />
    </FriendsStackNavigator.Navigator>
  );
};

const Tab = (): JSX.Element => {
  const {colors} = useAppSelector(state => state.styles);

  return (
    <BottomTabNavigator.Navigator
      tabBarOptions={{
        style: {backgroundColor: colors.HEADER},
        activeTintColor: colors.INDICATOR,
        showLabel: false,
      }}>
      <BottomTabNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Feather
              name="home"
              size={25}
              color={focused ? colors.INDICATOR : colors.INACTIVE_TINT}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="FriendsStack"
        component={FriendsStack}
        options={{
          tabBarBadge: undefined,
          tabBarIcon: ({focused}) => (
            <AntDesign
              name="team"
              size={25}
              color={focused ? colors.INDICATOR : colors.INACTIVE_TINT}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="settings-outline"
              size={25}
              color={focused ? colors.INDICATOR : colors.INACTIVE_TINT}
            />
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  );
};

export default React.memo(Tab);
