import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import S from './Styles';
import { User } from 'shared/types/user';
import { useFollowerCount } from 'shared/hook/useFollowerCount';
import MyFollower from 'shared/components/MyFollowers';
import { useFollowers } from 'shared/hook/useFollowers';
import MyText from 'shared/components/MyText';

const FollowerScreen = ({ navigation }) => {
  const user = global.User[0] as User;

  const { followers, loading, mutate } = useFollowers('' + user.id);
  const { followercount } = useFollowerCount('' + user.id);

  return (
    <View style={S.maincontainer}>
      <View style={S.titlecontainer}>
        <MyText fontSize={24} fontWeight={'bold'}>
          My Followers
        </MyText>
      </View>
      <View style={S.subcontainer}>
        <MyText fontSize={16} fontWeight={'medium'}>
          Follower
        </MyText>
        <View style={S.subcontainer2}>
          <MyText fontSize={36} fontWeight={'bold'} color={'#F98B65'}>
            {followercount}
          </MyText>
        </View>
      </View>
      <ScrollView style={S.container}>
        <MyFollower followers={followers} />
      </ScrollView>
    </View>
  );
};

export default FollowerScreen;
