import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { HomeScreenParams } from 'screens/Main/HomeScreen';

export type MainTabParams = {
  Home: HomeScreenParams;
  Record: any;
  Search: any;
  Profile: any;
};

export type MainTabScreenProps<T extends keyof MainTabParams> =
  BottomTabScreenProps<MainTabParams, T>;
