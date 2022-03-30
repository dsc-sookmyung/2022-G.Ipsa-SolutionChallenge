import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from 'screens/Main/HomeScreen';
import RecordScreen from 'screens/Main/RecordScreen';
import SearchScreen from 'screens/Main/SearchScreen';
import MyTabHeader from 'shared/components/MyTabHeader';
import { colors } from 'shared/utils/colors';
import { MyText } from 'shared/components';
import Profile from './Profile';
import PlayingBarProvider from 'src/provider/PlayingBarProvider';
import PlayingBar from 'shared/components/PlayingBar';
import MusicPlayerProvider from 'src/provider/MusicPlayerProvider';
import PlayingStoryProvider from 'src/provider/PlayingStoryProvider';
import MusicPlayerModal from 'shared/components/MusicPlayerModal';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <PlayingStoryProvider>
      <PlayingBarProvider>
        <MusicPlayerProvider>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              header: MyTabHeader,
              tabBarStyle: {
                height: 60,
                backgroundColor: colors.background,
                paddingBottom: 4,
              },
              tabBarLabel: ({ color }) => (
                <MyText
                  color={color}
                  fontSize={14}
                  fontWeight="medium"
                  style={{ marginBottom: 4 }}
                >
                  {route.name}
                </MyText>
              ),
              tabBarIconStyle: {
                marginBottom: -4,
              },
              tabBarIcon: ({ color, size }) => {
                const iconName =
                  route.name === 'Home'
                    ? 'home'
                    : route.name === 'Record'
                    ? 'microphone'
                    : route.name === 'Search'
                    ? 'search'
                    : 'user';

                return (
                  <FontAwesome name={iconName} size={size - 2} color={color} />
                );
              },
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.gray7,
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Record" component={RecordScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="My page" component={Profile} />
          </Tab.Navigator>
          <MusicPlayerModal />
          <PlayingBar />
        </MusicPlayerProvider>
      </PlayingBarProvider>
    </PlayingStoryProvider>
  );
};

export default Main;
