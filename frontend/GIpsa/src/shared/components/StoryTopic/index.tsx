import React, { FC } from 'react';
import { Text, View, ScrollView } from 'react-native';

import S from './Styles';
import { Story } from 'shared/types';
import { StoryCard } from '..';

export interface StoryTopicProps {
  title: string;
  stories: Story[] | undefined;
}

const StoryTopic: FC<StoryTopicProps> = ({
  title,
  stories,
}: StoryTopicProps) => {
  return (
    <View style={S.container}>
      <Text style={S.title}>{title}</Text>
      <ScrollView style={S.storyCardContainer} horizontal persistentScrollbar>
        {stories?.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </ScrollView>
    </View>
  );
};

export default StoryTopic;
