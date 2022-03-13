import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from 'screens/Main/Profile/ProfileScreen';
import UploadedScreen from 'screens/Main/Profile/UploadedScreen';

const Stack = createNativeStackNavigator();

const Profile = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="UploadedScreen" component={UploadedScreen} />
    </Stack.Navigator>
  );
};

export default Profile;
