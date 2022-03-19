import React, { FC } from 'react';
import { Image, Text, View } from 'react-native';

import S from './Styles';
import { Story } from 'shared/types';
import MyText from '../MyText';
import moment from 'moment';

export interface StoryCardHorizontalProps {
  story: Story;
}

const StoryCardHorizontal: FC<StoryCardHorizontalProps> = ({
  story,
}: StoryCardHorizontalProps) => {
  return (
    <View style={S.container}>
      <View style={S.container2}>
        <Image
          style={S.thumbnail}
          source={{
            uri: story.thumbnailImageSrc,
          }}
        />
        <View style={S.container3}>
          <MyText fontSize={18} fontWeight="bold">
            {story.title}
          </MyText>
          <MyText fontSize={14} fontWeight="medium">
            {moment(story.createdAt).format('YYYY.MM.DD')}
          </MyText>
        </View>
      </View>
    </View>
  );
};

export default StoryCardHorizontal;
