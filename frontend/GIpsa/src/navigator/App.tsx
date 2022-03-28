import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Sign from './Sign';
import Main from './Main';
import UserProvider from 'src/provider/UserProvider';
import GlobalPlayerProvider, {
  useGlobalPlayerPv,
} from 'src/provider/GlobalPlayerProvider';
import GlobalPlayer from 'shared/components/GlobalPlayer';

const Stack = createNativeStackNavigator();

export default function App() {
  // TODO: 유저 로그인 정보 확인 후 Sign 화면 render X -> 바로 Main 으로 가게
  const { playerShow, setPlayerShow } = useGlobalPlayerPv();
  console.log('App.tsx playerShow: ' + playerShow);
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Sign" component={Sign} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
