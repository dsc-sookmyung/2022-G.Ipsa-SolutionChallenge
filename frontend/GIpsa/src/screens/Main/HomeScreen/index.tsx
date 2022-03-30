import { ScrollView, Text } from 'react-native';
import React from 'react';
import moment from 'moment';

import S from './Styles';
import { MainTabScreenProps } from 'navigator/types';
import { StoryTopic } from 'shared/components';
import { useStories } from 'shared/hook/useStories';
import PlayingBar from 'shared/components/PlayingBar';
import { usePlayingBarShow } from 'src/provider/PlayingBarProvider';

export type HomeScreenParams = {
  a: number;
};

const HomeScreen = ({ navigation, route }: MainTabScreenProps<'Home'>) => {
  const { stories } = useStories();
  const { isPlayingBarShow } = usePlayingBarShow();

  const timeSortedStories = stories?.sort(
    (a, b) =>
      moment(b.createdAt).toDate().getTime() -
      moment(a.createdAt).toDate().getTime()
  );

  const likeSortedStories = stories?.sort((a, b) => b.likes - a.likes);

  return (
    <ScrollView style={S.container}>
      <StoryTopic title="Weekly New Stories" stories={timeSortedStories} />
      <StoryTopic title="Weekly Best Stories" stories={likeSortedStories} />
    </ScrollView>
  );
};

export default HomeScreen;
