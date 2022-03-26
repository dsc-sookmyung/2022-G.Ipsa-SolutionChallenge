import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import S from './Styles';
import { User } from 'shared/types/user';
import { MyStories } from 'shared/components';
import { StoryTopic } from 'shared/components';
import { Story } from 'shared/types';
import { useStories } from 'shared/hook/useStories';
import { useStoryCount } from 'shared/hook/useStoryCount';
import { useFollowerCount } from 'shared/hook/useFollowerCount';
import MyText from 'shared/components/MyText';

import { useUserPv } from 'src/provider/UserProvider';


const UploadedScreen = ({ navigation }) => {
  const { userpv, setUserpv } = useUserPv();

  const { stories, loading, mutate } = useStories('?creatorId=' + userpv.id);
  const { storycount } = useStoryCount('' + userpv.id);
  const { followercount } = useFollowerCount('' + userpv.id);
  // console.log(stories);
  //const user: User = {
  //  email: 'ryann3@naver.com',
  //  profileImageSrc:
  //    'https://k.kakaocdn.net/dn/vXU15/btrrr6F36R6/dDTklzgUtdGkHiRFZ5Mdm1/img_640x640.jpg',
  //  birth: new Date(1909, 9, 9),
  //  showBirth: false,
  //  isCreator: true,
  //  nickname: 'Nana',
  //};
  //test
  //const storyys: Story[] = [];
  //storyys.push({
  //  id: 12,
  //  creatorId: 13,
  //  category: 'sth',
  //  audioFileSrc: '',
  //  likes: 2,
  //  title: 'title1',
  //  thumbnailImageSrc:
  //    'https://k.kakaocdn.net/dn/chFJvJ/btrlY5GSAEx/KdKaCGcO2kyMpE5mM1cwp1/img_640x640.jpg',
  //  createdAt: new Date(2020, 9, 9),
  //});
  //storyys.push({
  //  id: 13,
  //  creatorId: 14,
  //  category: 'sth',
  //  audioFileSrc: '',
  //  likes: 3,
  //  title: 'title2',
  //  thumbnailImageSrc:
  //    'https://k.kakaocdn.net/dn/vXU15/btrrr6F36R6/dDTklzgUtdGkHiRFZ5Mdm1/img_640x640.jpg',
  //  createdAt: new Date(2021, 3, 9),
  //});

  return (
    <View style={S.maincontainer}>
      <View style={S.titlecontainer}>
        <MyText fontSize={24} fontWeight={'bold'}>
          My Uploaded Story
        </MyText>
      </View>
      <View style={S.dateAlign}>
        <View style={S.centercontainer}>
          <MyText fontSize={16}>Content</MyText>
          <View style={S.numMargin}>
            <MyText fontSize={36} fontWeight={'bold'} color={'#F98B65'}>
              {storycount}
            </MyText>
          </View>
        </View>
        <View style={S.centercontainer}>
          <MyText fontSize={16}>Follower</MyText>
          <View style={S.numMargin}>
            <MyText fontSize={36} fontWeight={'bold'} color={'#F98B65'}>
              {followercount}
            </MyText>
          </View>
        </View>
      </View>
      <ScrollView style={S.container}>
        <MyStories title="Stories" stories={stories} />
      </ScrollView>
    </View>
  );
};

export default UploadedScreen;
