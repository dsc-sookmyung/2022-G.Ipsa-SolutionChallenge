import React, { FC } from 'react';
import { Image, Text, View } from 'react-native';

import S from './Styles';
import { Follower } from 'shared/types';

export interface FollowerCardProps {
  follower: Follower;
}

const FollowerCard: FC<FollowerCardProps> = ({
  follower,
}: FollowerCardProps) => {
  return (
    <View style={S.container}>
      <View style={S.container2}>
        <Image
          style={S.thumbnail}
          source={{
            uri: follower.profileImageSrc,
          }}
        />
        <View style={S.container3}>
          <Text style={S.title}>{follower.nickname}</Text>
        </View>
      </View>
    </View>
  );
};

export default FollowerCard;
