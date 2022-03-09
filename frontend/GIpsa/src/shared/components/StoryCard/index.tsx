import React, { FC } from 'react';
import { Image, Text, View } from 'react-native';

import S from './Styles';
import { Story } from 'shared/types';

export interface StoryCardProps {
  story: Story;
}

const StoryCard: FC<StoryCardProps> = ({ story }: StoryCardProps) => {
  return (
    <View style={S.container}>
      <Image
        style={S.thumbnail}
        source={{
          uri: 'https://k.kakaocdn.net/dn/chFJvJ/btrlY5GSAEx/KdKaCGcO2kyMpE5mM1cwp1/img_640x640.jpg',
        }}
      />
      <Text style={S.title}>{story.title}</Text>
      <Text style={S.creator}>{`made by > ${story.creatorId}`}</Text>
    </View>
  );
};

export default StoryCard;
