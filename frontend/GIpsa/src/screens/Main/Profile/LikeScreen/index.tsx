import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import S from './Styles';
import { User } from 'shared/types/user';

import { MyStories } from 'shared/components';
import { useLikedStories } from 'shared/hook/useLikedStories';

const LikeScreen = ({ navigation }) => {
  const user = global.User[0] as User;

  const { stories } = useLikedStories('' + user.id);
  console.log(stories);

  return (
    <View>
      <Text style={S.title}>My Liked Stories</Text>
      <View style={{ alignItems: 'center' }}>
        <Text style={S.text1}>Liked Stories</Text>
      </View>
      <ScrollView style={S.container}>
        <MyStories stories={stories} title={''} />
      </ScrollView>
    </View>
  );
};

export default LikeScreen;
