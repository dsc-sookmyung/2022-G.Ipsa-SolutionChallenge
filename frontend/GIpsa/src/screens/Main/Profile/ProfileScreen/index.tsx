import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import S from './Styles';
import { User } from 'shared/types/user';
import { isRegularExpressionLiteral } from 'typescript';
import MyText from 'shared/components/MyText';
import * as Progress from 'react-native-progress';
import { useisUser } from 'shared/hook/useisUser';
import UserProvider, { useUserPv } from 'src/provider/UserProvider';

const ProfileScreen = ({ navigation }) => {
  const [isProfile, setIsProfile] = useState(true);
  const { userpv, setUserpv } = useUserPv();
  useEffect(() => {
    if (userpv?.profileImageSrc == 'string') {
      setIsProfile(false);
    }
  }, [userpv]);

  return (
    <View style={S.maincontainer}>
      <View style={S.centercontainer}>
        {isProfile && userpv?.profileImageSrc != 'string' ? (
          <Image
            source={{ uri: userpv?.profileImageSrc }}
            style={S.profileImg}
          />
        ) : (
          <Image
            source={require('../../../../shared/assets/images/default-profile.jpg')}
            style={S.profileImg}
          />
        )}
      </View>
      {!userpv && (
        <View style={S.centercontainer}>
          <Progress.Circle size={30} indeterminate={true} />
        </View>
      )}
      {userpv && (
        <View style={S.subcontainer}>
          <MyText fontSize={20} fontWeight={'bold'}>
            {userpv.nickname}
          </MyText>
        </View>
      )}
      {userpv && (
        <View style={S.centercontainer}>
          {userpv.isCreator && (
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
