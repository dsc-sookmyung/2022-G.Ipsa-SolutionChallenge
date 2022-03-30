import React, { FC } from 'react';
import { Image, View } from 'react-native';

import S from './Styles';
import { Story } from 'shared/types';
import MyText from '../MyText';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import { usePlayingStory } from 'src/provider/PlayingStoryProvider';
import { useMusicPlayerShow } from 'src/provider/MusicPlayerProvider';
import { usePlayingBarShow } from 'src/provider/PlayingBarProvider';

export interface StoryCardHorizontalProps {
  story: Story;
}

const StoryCardHorizontal: FC<StoryCardHorizontalProps> = ({
  story,
}: StoryCardHorizontalProps) => {
  const { setIsMusicPlayerShow } = useMusicPlayerShow();
  const { setIsPlayingBarShow } = usePlayingBarShow();
  const { setPlayingStory } = usePlayingStory();

  const handlePress = () => {
    setPlayingStory(story);
    setIsMusicPlayerShow(true);
    setIsPlayingBarShow(true);
  };

  return (
    <View style={S.container}>
      <TouchableOpacity onPress={handlePress}>
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
