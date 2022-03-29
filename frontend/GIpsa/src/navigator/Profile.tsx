import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from 'screens/Main/Profile/ProfileScreen';
import UploadedScreen from 'screens/Main/Profile/UploadedScreen';
import FollowerScreen from 'screens/Main/Profile/FollowerScreen';
import LikeScreen from 'screens/Main/Profile/LikeScreen';
import { usePlayingBarShow } from 'src/provider/PlayingBarProvider';
import GlobalPlayer from 'shared/components/GlobalPlayer';

const Stack = createNativeStackNavigator();

const Profile = () => {
  const { isPlayingBarShow: playerShow, setIsPlayingBarShow: setPlayerShow } =
    usePlayingBarShow();

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="UploadedScreen" component={UploadedScreen} />
        <Stack.Screen name="FollowerScreen" component={FollowerScreen} />
        <Stack.Screen name="LikeScreen" component={LikeScreen} />
      </Stack.Navigator>
      {playerShow && <GlobalPlayer />}
    </>
  );
};

export default Profile;
