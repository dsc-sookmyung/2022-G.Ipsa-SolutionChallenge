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

  const stories: Story[] = [];
  stories.push(story);

  return (
    <View style={S.container}>
      {isM && <PlayerModal stories={stories} />}
      <TouchableOpacity onPress={() => setIsM(!isM)}>
        <View style={S.container2}>
          <Image
            style={S.thumbnail}
            source={{
              uri:
                story.thumbnailImageSrc === 'string'
                  ? 'https://k.kakaocdn.net/dn/chFJvJ/btrlY5GSAEx/KdKaCGcO2kyMpE5mM1cwp1/img_640x640.jpg'
                  : story.thumbnailImageSrc,
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
