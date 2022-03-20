import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import S from './Styles';
import { User } from 'shared/types/user';

import { MyStories } from 'shared/components';
import { useLikedStories } from 'shared/hook/useLikedStories';
import MyText from 'shared/components/MyText';

const LikeScreen = ({ navigation }) => {
  const user = global.User[0] as User;

  const { stories } = useLikedStories('' + user.id);
  console.log(stories);

  return (
    <View style={S.maincontainer}>
      <View style={S.titlecontainer}>
        <MyText fontSize={24} fontWeight={'bold'}>
          My Liked Stories
        </MyText>
      </View>
      <View style={S.subcontainer}>
        <MyText fontSize={16} fontWeight={'medium'}>
          Liked Stories
        </MyText>
      </View>
      <ScrollView style={S.container}>
        <MyStories stories={stories} title={''} />
      </ScrollView>
    </View>
  );
};

export default LikeScreen;
