import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import S from './Styles';
import { User } from 'shared/types/user';
import { MyStories } from 'shared/components';
import { StoryTopic } from 'shared/components';
import { Story } from 'shared/types';
import { useStories } from 'shared/hook/useStories';

const UploadedScreen = ({ navigation }) => {
  const { stories, loading, mutate } = useStories();

  // console.log(stories);
  // ¿¹½Ã
  const user: User = {
    email: 'ryann3@naver.com',
    profileImageSrc:
      'https://k.kakaocdn.net/dn/vXU15/btrrr6F36R6/dDTklzgUtdGkHiRFZ5Mdm1/img_640x640.jpg',
    birth: new Date(1909, 9, 9),
    showBirth: false,
    isCreator: true,
    nickname: 'Nana',
  };
  //test
  const storyys: Story[] = [];
  storyys.push({
    id: 12,
    creatorId: 13,
    category: 'sth',
    audioFileSrc: '',
    likes: 2,
    title: 'title1',
    thumbnailImageSrc:
      'https://k.kakaocdn.net/dn/chFJvJ/btrlY5GSAEx/KdKaCGcO2kyMpE5mM1cwp1/img_640x640.jpg',
    createdAt: new Date(2020, 9, 9),
  });
  storyys.push({
    id: 13,
    creatorId: 14,
    category: 'sth',
    audioFileSrc: '',
    likes: 3,
    title: 'title2',
    thumbnailImageSrc:
      'https://k.kakaocdn.net/dn/vXU15/btrrr6F36R6/dDTklzgUtdGkHiRFZ5Mdm1/img_640x640.jpg',
    createdAt: new Date(2021, 3, 9),
  });

  return (
    <View>
      <Text style={S.title}>My Uploaded Story</Text>
      <View style={S.dateAlign}>
        <View>
          <Text style={S.text1}>Content</Text>
          <Text style={S.numbers}>50</Text>
        </View>
        <View>
          <Text style={S.text1}>Follower</Text>
          <Text style={S.numbers}>300</Text>
        </View>
      </View>
      <ScrollView style={S.container}>
        <MyStories title="Stories" stories={storyys} />
      </ScrollView>
    </View>
  );
};

export default UploadedScreen;
