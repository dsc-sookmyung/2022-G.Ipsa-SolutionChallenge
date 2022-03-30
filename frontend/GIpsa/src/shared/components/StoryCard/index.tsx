import React, { FC } from 'react';
import { Image, View } from 'react-native';

import S from './Styles';
import { Story } from 'shared/types';
import MyText from '../MyText';
import { TouchableOpacity } from 'react-native';
import { usePlayingStory } from 'src/provider/PlayingStoryProvider';
import { useMusicPlayerShow } from 'src/provider/MusicPlayerProvider';
import { usePlayingBarShow } from 'src/provider/PlayingBarProvider';

export interface StoryCardProps {
  story: Story;
}

const StoryCard: FC<StoryCardProps> = ({ story }: StoryCardProps) => {
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
        <Image
          style={S.thumbnail}
          source={{
            uri:
              story.thumbnailImageSrc === 'string'
                ? 'https://storage.googleapis.com/gipsa-upload/default-images/random-0.jpg'
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
        >{`made by > ${story.nickname}`}</MyText>
      </TouchableOpacity>
    </View>
  );
};

export default StoryCard;
