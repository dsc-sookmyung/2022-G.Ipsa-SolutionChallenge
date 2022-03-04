import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from 'screens/Sign/LoginScreen';
import SigninScreen from 'screens/Sign/SigninScreen';

const Stack = createNativeStackNavigator();

const Sign = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
    </Stack.Navigator>
  );
};

export default Sign;
