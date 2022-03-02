import { View, Text } from 'react-native';
import React from 'react';

import S from './Styles';
import { MainTabScreenProps } from 'navigator/types';

export type HomeScreenParams = {
  a: number;
};

const HomeScreen = ({ navigation, route }: MainTabScreenProps<'Home'>) => {
  return (
    <View style={S.container}>
      <Text style={S.title}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
