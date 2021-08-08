import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PrivateStackParamList} from '../types';
import Game from '../screens/Game/Game';
import Tab from './Tab';
import {useEffect} from 'react';
import {socketController} from '../api';
import {AppState} from 'react-native';

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
        name="Game"
        component={Game}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default PrivateRoutes;
