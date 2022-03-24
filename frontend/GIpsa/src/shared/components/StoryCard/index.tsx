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

  // story 고대로 넣으면 될 듯
  const stories: Story[] = [
    {
      id: 6,
      creatorId: 53,
      title: 'shumdang',
      thumbnailImageSrc:
        'https://storage.googleapis.com/gipsa-upload/storySrc/shumdang.jpg',
      category: 'animation',
      audioFileSrc:
        'https://storage.googleapis.com/gipsa-upload/storySrc/%EC%95%84%EC%9D%B4%EC%9C%A0-02-Zeze-CHAT-SHIRE-320.mp3',
      likes: 0,
      createdAt: new Date('2022-03-22T17:51:13.931Z'),
      duration: 190,
    },
    {
      id: 7,
      creatorId: 54,
      title: 'ddangddang',
      thumbnailImageSrc:
        'https://storage.googleapis.com/gipsa-upload/storySrc/ddangddang.jpg',
      category: 'animation',
      audioFileSrc:
        'https://storage.googleapis.com/gipsa-upload/storySrc/%EC%95%84%EC%9D%B4%EC%9C%A0-05-Red%20Queen%20(Feat.%20Zion.T)-CHAT-SHIRE-320.mp3',
      likes: 0,
      createdAt: new Date('2022-03-22T17:52:44.587Z'),
      duration: 216,
    },
  ];

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
