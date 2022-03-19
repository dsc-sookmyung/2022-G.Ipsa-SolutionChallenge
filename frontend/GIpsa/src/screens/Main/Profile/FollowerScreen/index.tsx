import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import S from './Styles';
import { User } from 'shared/types/user';
import { useFollowerCount } from 'shared/hook/useFollowerCount';
import MyFollower from 'shared/components/MyFollowers';
import { useFollowers } from 'shared/hook/useFollowers';

const FollowerScreen = ({ navigation }) => {
  const user = global.User[0] as User;

  const { followers, loading, mutate } = useFollowers('' + user.id);
  const { followercount } = useFollowerCount('' + user.id);

  return (
    <View>
      <Text style={S.title}>My Followers</Text>
      <View style={{ alignItems: 'center' }}>
        <Text style={S.text1}>Follower</Text>
        <Text style={S.numbers}>{followercount}</Text>
      </View>
      <ScrollView style={S.container}>
        <MyFollower followers={followers} />
      </ScrollView>
    </View>
  );
};

export default FollowerScreen;
