import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from 'screens/Main/HomeScreen';
import RecordScreen from 'screens/Main/CreateScreen';
import SearchScreen from 'screens/Main/SearchScreen';
import ProfileScreen from 'screens/Main/ProfileScreen';
import MyTabHeader from 'shared/components/MyTabHeader';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator screenOptions={{ header: MyTabHeader }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Record" component={RecordScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="My page" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default Main;
