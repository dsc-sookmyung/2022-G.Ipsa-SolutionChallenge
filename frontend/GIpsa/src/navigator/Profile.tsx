import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from 'screens/Main/Profile/ProfileScreen';
import UploadedScreen from 'screens/Main/Profile/UploadedScreen';
import FollowerScreen from 'screens/Main/Profile/FollowerScreen';
import LikeScreen from 'screens/Main/Profile/LikeScreen';
import { useGlobalPlayerPv } from 'src/provider/GlobalPlayerProvider';
import GlobalPlayer from 'shared/components/GlobalPlayer';
import ProfileProvider from 'src/provider/profileProvider';

const Stack = createNativeStackNavigator();

const Profile = () => {
  const { playerShow, setPlayerShow } = useGlobalPlayerPv();

  return (
    <ProfileProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="UploadedScreen" component={UploadedScreen} />
        <Stack.Screen name="FollowerScreen" component={FollowerScreen} />
        <Stack.Screen name="LikeScreen" component={LikeScreen} />
      </Stack.Navigator>
      {playerShow && <GlobalPlayer />}
    </ProfileProvider>
  );
};

export default Profile;
