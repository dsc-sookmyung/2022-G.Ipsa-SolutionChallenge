import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import S from './Styles';
import { User } from 'shared/types/user';
import { isRegularExpressionLiteral } from 'typescript';
import MyText from 'shared/components/MyText';
import * as Progress from 'react-native-progress';
import { useisUser } from 'shared/hook/useisUser';
import * as global from 'shared/constants/global_var';

const ProfileScreen = ({ navigation }) => {
  const [isProfile, setIsProfile] = useState(true);
  const { isUser } = useisUser(global.User[0]);
  const [user, setUser] = useState<User>();

  console.log(global.User[0]);

  useEffect(() => {
    if (isUser) {
      setUser(global.User[0]);
      if (global.User[0].profileImageSrc == '') {
        setIsProfile(false);
      }
    }
  }, [isUser]);

  return (
    <View style={S.maincontainer}>
      <View style={S.centercontainer}>
        {user != undefined && isProfile && (
          <Image source={{ uri: user.profileImageSrc }} style={S.profileImg} />
        )}
        {!isProfile && (
          <Image
            source={require('../../../../shared/assets/images/default-profile.jpg')}
            style={S.profileImg}
          />
        )}
      </View>
      {user == undefined && (
        <View style={S.container2}>
          <Progress.Circle size={30} indeterminate={true} />
        </View>
      )}
      {user != undefined && (
        <View style={S.subcontainer}>
          <MyText fontSize={20} fontWeight={'bold'}>
            {user.nickname}
          </MyText>
        </View>
      )}
      {user != undefined && (
        <View style={S.centercontainer}>
          {user.isCreator && (
            <TouchableOpacity
              style={S.signInButton}
              onPress={() => navigation.navigate('UploadedScreen')}
            >
              <Image
                source={require('../../../../shared/assets/images/mystory.jpg')}
                style={S.signInButton}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
      <View style={S.container2}>
        <TouchableOpacity
          style={S.touchableText}
          onPress={() => navigation.navigate('FollowerScreen')}
        >
          <MyText fontSize={16}>My following teller</MyText>
        </TouchableOpacity>
        <TouchableOpacity
          style={S.touchableText}
          onPress={() => navigation.navigate('LikeScreen')}
        >
          <MyText fontSize={16}>My like story</MyText>
        </TouchableOpacity>
        <TouchableOpacity style={S.touchableText}>
          <MyText fontSize={16}>My comments</MyText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
