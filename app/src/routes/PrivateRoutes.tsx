import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PrivateStackParamList} from '../types';
import LocalGame from '../screens/LocalGame/LocalGame';
import Tab from './Tab';
import {useEffect} from 'react';
import {socketController} from '../api';
import {AppState} from 'react-native';
import CreateGame from '../screens/CreateGame/CreateGame';
import OnlineGame from '../screens/OnlineGame/OnlineGame';

const Stack = createStackNavigator<PrivateStackParamList>();

const PrivateRoutes = (): JSX.Element => {
  useEffect(() => {
    socketController.connect();

    AppState.addEventListener('change', state => {
      if (
        ['inactive', 'background'].includes(state) &&
        socketController.socket
      ) {
        socketController.disconnect();
      }
      if (state === 'active' && !socketController.socket) {
        socketController.connect();
      }
    });
    return () => {
      if (!socketController.socket) return;
      socketController.disconnect();
    };
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LocalGame"
        component={LocalGame}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnlineGame"
        component={OnlineGame}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateGame"
        component={CreateGame}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default PrivateRoutes;
