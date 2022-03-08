import React, { FC } from 'react';
import { Text, View } from 'react-native';

import S from './Styles';
import { Story } from 'shared/types';

export interface StoryCardProps {
  story: Story;
}

const StoryCard: FC<StoryCardProps> = ({ story }: StoryCardProps) => {
  return <View style={S.container}></View>;
};

export default StoryCard;
