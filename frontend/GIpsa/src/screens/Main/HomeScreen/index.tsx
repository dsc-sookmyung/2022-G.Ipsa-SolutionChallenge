import { ScrollView, Text } from 'react-native';
import React from 'react';

import S from './Styles';
import { MainTabScreenProps } from 'navigator/types';
import { StoryTopic } from 'shared/components';
import { Story } from 'shared/types';
import { useStories } from 'shared/hook/useStories';

export type HomeScreenParams = {
  a: number;
};

const HomeScreen = ({ navigation, route }: MainTabScreenProps<'Home'>) => {
  const { stories, loading, mutate } = useStories();

  return (
    <ScrollView style={S.container}>
      <Text style={S.title}>HomeScreen</Text>
      <StoryTopic title="인기 스토리" stories={stories} />
    </ScrollView>
  );
};

export default HomeScreen;
