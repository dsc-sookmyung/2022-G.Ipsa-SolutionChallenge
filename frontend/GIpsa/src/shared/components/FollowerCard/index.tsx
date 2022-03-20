import React, { FC, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

import S from './Styles';
import { Follower } from 'shared/types';
import MyText from 'shared/components/MyText';

export interface FollowerCardProps {
  follower: Follower;
}

const FollowerCard: FC<FollowerCardProps> = ({
  follower,
}: FollowerCardProps) => {
  const [isProfile, setIsProfile] = useState(true);
  useEffect(() => {
    if (follower.profileImageSrc == '') {
      setIsProfile(false);
    }
  }, [follower]);

  return (
    <View style={S.container}>
      <View style={S.container2}>
        {isProfile && (
          <Image
            style={S.thumbnail}
            source={{
              uri: follower.profileImageSrc,
            }}
          />
        )}
        {!isProfile && (
          <Image
            style={S.thumbnail}
            source={require('../../assets/images/default-profile.jpg')}
          />
        )}
        <View style={S.container3}>
          <MyText fontSize={18}>{follower.nickname}</MyText>
        </View>
      </View>
    </View>
  );
};

export default FollowerCard;
