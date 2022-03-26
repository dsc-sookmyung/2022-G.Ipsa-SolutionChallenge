import React, { FC, useState } from 'react';
import { Image, Text, View } from 'react-native';

import S from './Styles';
import { Story } from 'shared/types';
import MyText from '../MyText';
import { TouchableOpacity } from 'react-native';
import PlayerModal from '../PlayerModal';

export interface StoryCardProps {
  story: Story;
}

const StoryCard: FC<StoryCardProps> = ({ story }: StoryCardProps) => {
  const [isM, setIsM] = useState(false);

  const stories: Story[] = [];
  stories.push(story);

  return (
    <View style={S.container}>
      {isM && <PlayerModal stories={stories} />}
      <TouchableOpacity onPress={() => setIsM(!isM)}>
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
      </TouchableOpacity>
    </View>
  );
};

export default StoryCard;
