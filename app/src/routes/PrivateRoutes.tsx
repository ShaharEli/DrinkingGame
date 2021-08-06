import React, {ReactElement} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {PrivateStackParamList} from '../types';
import Game from '../screens/Game/Game';
import Tab from './Tab';

const Stack = createStackNavigator<PrivateStackParamList>();

const PrivateRoutes = (): ReactElement => {
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
