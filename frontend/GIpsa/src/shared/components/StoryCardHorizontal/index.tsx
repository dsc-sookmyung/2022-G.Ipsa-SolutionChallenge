import React, { FC, useState } from 'react';
import { Image, Text, View } from 'react-native';

import S from './Styles';
import { Story } from 'shared/types';
import MyText from '../MyText';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import PlayerModal from '../PlayerModal';

export interface StoryCardHorizontalProps {
  story: Story;
}

const StoryCardHorizontal: FC<StoryCardHorizontalProps> = ({
  story,
}: StoryCardHorizontalProps) => {
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
      </TouchableOpacity>
    </View>
  );
};

export default StoryCardHorizontal;
