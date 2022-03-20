import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import S from './Styles';
import { User } from 'shared/types/user';
import { isRegularExpressionLiteral } from 'typescript';

const ProfileScreen = ({ navigation }) => {
  const [isProfile, setIsProfile] = useState(true);
  const user = global.User[0] as User;

  console.log('global.User[0]' + global.User[0]);

  useEffect(() => {
    if (user.profileImageSrc == '') {
      setIsProfile(false);
    }
  }, [user]);

  return (
    <View>
      <Text style={S.title}>My Page</Text>
      {isProfile && (
        <Image source={{ uri: user.profileImageSrc }} style={S.profileImg} />
      )}
      {!isProfile && (
        <Image
          source={require('../../../../shared/assets/images/default-profile.jpg')}
          style={S.profileImg}
        />
      )}

      <Text style={S.userName}>{user.nickname}</Text>
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

      <View style={S.container2}>
        <Text
          style={S.subtitle}
          onPress={() => navigation.navigate('FollowerScreen')}
        >
          My following teller
        </Text>
        <Text
          style={S.subtitle}
          onPress={() => navigation.navigate('LikeScreen')}
        >
          My like story
        </Text>
        <Text style={S.subtitle}>My comments</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
