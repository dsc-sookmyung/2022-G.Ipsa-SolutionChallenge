import React, { FC } from 'react';
import { Text, View, ScrollView } from 'react-native';

import S from './Styles';
import { Story } from 'shared/types';
import { StoryCardHorizontal } from '..';
import MyText from 'shared/components/MyText';

export interface MyStoriesProps {
  title: string;
  stories: Story[] | undefined;
}

const MyStories: FC<MyStoriesProps> = ({ title, stories }: MyStoriesProps) => {
  return (
    <View style={S.container}>
      <MyText fontSize={16}>{title}</MyText>
      <ScrollView style={S.storyCardContainer} persistentScrollbar>
        {stories?.map((story) => (
          <StoryCardHorizontal key={story.id} story={story} />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyStories;
