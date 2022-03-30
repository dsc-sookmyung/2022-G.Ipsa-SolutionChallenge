import React, { FC } from 'react';
import { Text, View, ScrollView } from 'react-native';

import S from './Styles';
import { Story } from 'shared/types';
import { StoryCardHorizontal } from '..';
import MyText from 'shared/components/MyText';

export interface MyStoriesProps {
  stories: Story[] | undefined;
}

const MyStories: FC<MyStoriesProps> = ({ stories }: MyStoriesProps) => {
  console.log('My Stories: ' + JSON.stringify(stories));
  return (
    <View style={S.container}>
      <ScrollView style={S.storyCardContainer} persistentScrollbar>
        {stories?.map((story) => (
          <StoryCardHorizontal key={story.id} story={story} />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyStories;
