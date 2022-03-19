import React, { FC } from 'react';
import { View, ScrollView } from 'react-native';

import S from './Styles';
import { Story } from 'shared/types';
import { StoryCard } from '..';
import MyText from '../MyText';

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
      <MyText fontWeight="regular" fontSize={16}>
        {title}
      </MyText>
      <ScrollView style={S.storyCardContainer} horizontal persistentScrollbar>
        {stories?.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </ScrollView>
    </View>
  );
};

export default StoryTopic;
