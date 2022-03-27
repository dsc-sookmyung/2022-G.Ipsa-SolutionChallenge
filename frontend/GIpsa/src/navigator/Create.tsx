import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecordScreen from 'screens/Main/CreateScreen/RecordScreen';
import ListenScreen from 'screens/Main/CreateScreen/ListenScreen';
const Stack = createNativeStackNavigator();

const Create = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecordScreen" component={RecordScreen} />
      <Stack.Screen name="ListenScreen" component={ListenScreen} />
    </Stack.Navigator>
  );
};

export default Create;
