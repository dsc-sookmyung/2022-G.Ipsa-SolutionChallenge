import { ScrollView, Text } from 'react-native';
import React from 'react';

import S from './Styles';
import { MainTabScreenProps } from 'navigator/types';
import { StoryTopic } from 'shared/components';
import { useStories } from 'shared/hook/useStories';
import moment from 'moment';

export type HomeScreenParams = {
  a: number;
};

const HomeScreen = ({ navigation, route }: MainTabScreenProps<'Home'>) => {
  const { stories, loading, mutate } = useStories();

  const timeSortedStories = stories?.sort(
    (a, b) =>
      moment(b.createdAt).toDate().getTime() -
      moment(a.createdAt).toDate().getTime()
  );

  const likeSortedStories = stories?.sort((a, b) => b.likes - a.likes);

  return (
    <ScrollView style={S.container}>
      <Text style={S.title}>HomeScreen</Text>
      <StoryTopic title="최신 업로드 스토리" stories={timeSortedStories} />
      <StoryTopic title="인기 스토리" stories={likeSortedStories} />
    </ScrollView>
  );
};

export default HomeScreen;
