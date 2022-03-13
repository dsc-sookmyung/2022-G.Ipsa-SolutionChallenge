import React, { FC } from 'react';
import { Text, View, ScrollView } from 'react-native';

import S from './Styles';
import { Story } from 'shared/types';
import { StoryCardHoriz } from '..';

export interface MyStoriesProps {
  title: string;
  stories: Story[] | undefined;
}

const MyStories: FC<MyStoriesProps> = ({ title, stories }: MyStoriesProps) => {
  return (
    <View style={S.container}>
      <Text style={S.title}>{title}</Text>
      <ScrollView style={S.storyCardContainer} persistentScrollbar>
        {stories?.map((story) => (
          <StoryCardHoriz key={story.id} story={story} />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyStories;
