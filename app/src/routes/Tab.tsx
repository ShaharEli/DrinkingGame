import React, {useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  IFriendRequest,
  FriendsStackParamList,
  TabsParamList,
  IUser,
} from '../types';
import HomeScreen from '../screens/Home/Home';
import Social from '../screens/Social/Social';
import Settings from '../screens/Settings/Settings';
import {useAppDispatch, useAppSelector} from '../hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {createStackNavigator} from '@react-navigation/stack';
import AddFriend from '../screens/AddFriend/AddFriend';
import {useEffect} from 'react';
import {socketController} from '../api';
import {addFriendRequest, setUser} from '../redux/slices';
import FriendRequests from '../screens/FriendRequests/FriendRequests';

const BottomTabNavigator = createBottomTabNavigator<TabsParamList>();
const FriendsStackNavigator = createStackNavigator<FriendsStackParamList>();

const FriendsStack = (): JSX.Element => {
  return (
    <FriendsStackNavigator.Navigator screenOptions={{headerShown: false}}>
      <FriendsStackNavigator.Screen name="Social" component={Social} />
      <FriendsStackNavigator.Screen name="AddFriend" component={AddFriend} />
      <FriendsStackNavigator.Screen
        name="FriendRequests"
        component={FriendRequests}
      />
    </FriendsStackNavigator.Navigator>
  );
};

const Tab = (): JSX.Element => {
  const {colors} = useAppSelector(state => state.styles);
  const {user} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socketController.subscribe<IFriendRequest>(
      'newFriendRequest',
      (friendRequest: IFriendRequest) => {
        dispatch(addFriendRequest(friendRequest));
      },
    );
    socketController.subscribe<IUser>(
      'friendRequestApproved',
      (friendRequest: IUser) => {
        console.log('here');

        dispatch(setUser(friendRequest));
      },
    );
  }, [dispatch]);

  const notificationsCount = useMemo(
    () =>
      user?.friendRequests.reduce(
        (acc, curr) =>
          acc + (curr.status === 'pending' && curr.to === user._id ? 1 : 0),
        0,
      ),
    [user.friendRequests, user._id],
  );

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
          tabBarBadge: notificationsCount || undefined,
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
