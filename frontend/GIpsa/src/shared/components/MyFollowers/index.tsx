import React, { FC } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Follower } from 'shared/types';
import FollowerCard from '../FollowerCard';

import S from './Styles';

export interface MyFollowersProps {
  followers: Follower[] | undefined;
}

const MyFollower: FC<MyFollowersProps> = ({ followers }: MyFollowersProps) => {
  return (
    <View style={S.container}>
      <ScrollView style={S.storyCardContainer} persistentScrollbar>
        {followers?.map((follower) => (
          <FollowerCard key={follower.id} follower={follower} />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyFollower;
