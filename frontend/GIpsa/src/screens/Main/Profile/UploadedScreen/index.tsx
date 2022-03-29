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

import { useCurrentUser } from 'src/provider/UserProvider';

const UploadedScreen = ({ navigation }) => {
  const { currentUser } = useCurrentUser();

  const { stories } = useStories(undefined, currentUser?.id);
  const { storycount } = useStoryCount(currentUser?.id);
  const { followercount } = useFollowerCount(currentUser?.id);

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
