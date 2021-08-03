import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabsParamList} from '../types';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Social from '../screens/Social/Social';
import Settings from '../screens/Settings/Settings';
import {useAppSelector} from '../hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BottomTabNavigator = createBottomTabNavigator<TabsParamList>();

const Tab = (): JSX.Element => {
  const {colors, rootStyles} = useAppSelector(state => state.styles);

  return (
    <BottomTabNavigator.Navigator
      tabBarOptions={{
        style: {backgroundColor: colors.HEADER},
        labelStyle: {...rootStyles.mb1},
        activeTintColor: colors.INDICATOR,
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
        name="Social"
        component={Social}
        options={{
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

export default Tab;
