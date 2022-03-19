import React, { FC } from 'react';
import { Image, Text, View } from 'react-native';

import S from './Styles';
import { Story } from 'shared/types';
import MyText from '../MyText';

export interface StoryCardProps {
  story: Story;
}

const StoryCard: FC<StoryCardProps> = ({ story }: StoryCardProps) => {
  return (
    <View style={S.container}>
      <Image
        style={S.thumbnail}
        source={{
          uri:
            story.thumbnailImageSrc === 'string'
              ? 'https://k.kakaocdn.net/dn/chFJvJ/btrlY5GSAEx/KdKaCGcO2kyMpE5mM1cwp1/img_640x640.jpg'
              : story.thumbnailImageSrc,
        }}
      />
      <MyText fontWeight="bold" fontSize={18} font="Suit">
        {story.title}
      </MyText>
      <MyText
        fontWeight="medium"
        fontSize={12}
        font="Suit"
      >{`made by > ${story.creatorId}`}</MyText>
    </View>
  );
};

export default StoryCard;
