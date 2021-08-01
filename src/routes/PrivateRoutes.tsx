import React, {ReactElement} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/HomeScreen/HomeScreen';
import {PrivateStackParamList} from '../types';

const Stack = createStackNavigator<PrivateStackParamList>();

const PrivateRoutes = (): ReactElement => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default PrivateRoutes;
