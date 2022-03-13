import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from 'screens/Main/HomeScreen';
import RecordScreen from 'screens/Main/CreateScreen';
import SearchScreen from 'screens/Main/SearchScreen';
import MyTabHeader from 'shared/components/MyTabHeader';
import { colors } from 'shared/utils/colors';
import { MyText } from 'shared/components';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: MyTabHeader,
        tabBarStyle: {
          backgroundColor: colors.background,
          paddingBottom: 4,
        },
        tabBarLabel: ({ color }) => (
          <MyText color={color} fontSize={13} fontWeight="medium">
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

          return <FontAwesome name={iconName} size={size - 2} color={color} />;
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
  );
};

export default Main;
