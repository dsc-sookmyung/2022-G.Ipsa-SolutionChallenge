import { View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';

import S from './Styles';
import MyText from 'shared/components/MyText';
import { useCurrentUser } from 'src/provider/UserProvider';

const ProfileScreen = ({ navigation }) => {
  const { currentUser } = useCurrentUser();

  const noProfile = currentUser?.profileImageSrc === 'string';

  return (
    <View style={S.maincontainer}>
      <View style={S.centercontainer}>
        {noProfile ? (
          <Image
            source={require('../../../../shared/assets/images/default-profile.jpg')}
            style={S.profileImg}
          />
        ) : (
          <Image
            source={{ uri: currentUser?.profileImageSrc }}
            style={S.profileImg}
          />
        )}
      </View>
      {currentUser ? (
        <>
          <View style={S.subcontainer}>
            <MyText fontSize={20} fontWeight={'bold'}>
              {currentUser.nickname}
            </MyText>
          </View>
          <View style={S.centercontainer}>
            {currentUser.isCreator && (
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
        </>
      ) : (
        <View style={S.centercontainer}>
          <Progress.Circle size={30} indeterminate={true} />
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
