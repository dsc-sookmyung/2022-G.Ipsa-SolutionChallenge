import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import S from './Styles';
import { User } from 'shared/types/user';

const ProfileScreen = ({ navigation }) => {
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

  return (
    <View>
      <Text style={S.title}>My Page</Text>
      <Image source={{ uri: user.profileImageSrc }} style={S.profileImg} />
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
        <Text style={S.subtitle}>My following teller</Text>
        <Text style={S.subtitle}>My like story</Text>
        <Text style={S.subtitle}>My comments</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
