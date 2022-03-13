import React, { FC } from 'react';
import { Image, Text, View } from 'react-native';

import S from './Styles';
import { Story } from 'shared/types';

export interface StoryCardHorizProps {
  story: Story;
}

const StoryCardHoriz: FC<StoryCardHorizProps> = ({
  story,
}: StoryCardHorizProps) => {
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
          <Text style={S.title}>{story.title}</Text>
          <Text style={S.creator}>{story.createdAt.toDateString()}</Text>
        </View>
      </View>
    </View>
  );
};

export default StoryCardHoriz;
