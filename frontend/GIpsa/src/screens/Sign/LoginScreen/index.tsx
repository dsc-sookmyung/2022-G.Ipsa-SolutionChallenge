import {
  View,
  Text,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  GoogleSignin,
  statusCodes,
  User as GUser,
} from '@react-native-google-signin/google-signin';
import {
  getProfile,
  KakaoOAuthToken,
  KakaoProfile,
  login,
  logout,
} from '@react-native-seoul/kakao-login';
import * as Progress from 'react-native-progress';

import S from './Styles';
import { User } from 'shared/types';
import { useUsersEmail } from 'shared/hook/useUsersEmail';
import { useECheck } from 'shared/hook/useECheck';
import { useCurrentUser } from 'src/provider/UserProvider';

const LoginScreen = ({ navigation }) => {
  // /* google
  useEffect(() => {
    configureGoogleSign();
  }, []);

  function configureGoogleSign() {
    GoogleSignin.configure({
      webClientId: '',
      offlineAccess: false,
    });
  }

  const [error, setError] = useState<Error>();
  const [email, setEmail] = useState('');
  const { usersEmail, loading } = useUsersEmail(email);
  const [userIn, setUserIn] = useState<User>();
  const [clicked, setClicked] = useState(false);

  const { setCurrentUser } = useCurrentUser();

  const LogInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const GuserInfo = await GoogleSignin.signIn();

      setClicked(true);
      setEmail(GuserInfo?.user.email);
      const user: User = {
        email: GuserInfo?.user.email,
        profileImageSrc: GuserInfo?.user.photo
          ? GuserInfo?.user.photo
          : 'string',

        birth: new Date(),
        showBirth: false,
        isCreator: false,
        nickname: '',
      };
      setUserIn(user);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        Alert.alert('Process Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        Alert.alert('Process in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        Alert.alert('Play services are not available');
      } else {
        // some other error
        Alert.alert('Something else went wrong... ', error.toString());
        setError(error);
      }
    }
  };

  const [userInfoKakao, setUserInfoKakao] = useState<KakaoProfile>();

  const { emailCheck } = useECheck(email);

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    getKakaoProfile();
    // setUserInfoKakao(JSON.stringify(token));
  };
  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();
    // setUserInfoKakao("message: \n"+message);
  };

  const getKakaoProfile = async (): Promise<void> => {
    const profile = await getProfile();
    setUserInfoKakao(profile as KakaoProfile);

    // 여기 userInfo 갖고 다음 장으로 이동 필요

    const KuserInfo: KakaoProfile = profile as KakaoProfile;
    setEmail(KuserInfo.email);
    setClicked(true);
    const user: User = {
      email: KuserInfo.email,
      profileImageSrc: KuserInfo.profileImageUrl,

      birth: new Date(),
      showBirth: false,
      isCreator: false,
      nickname: '',
    };
    setUserIn(user);
  };

  useEffect(() => {
    if (userIn && !loading) {
      console.log('email: ' + email);
      console.log('emailCheck: ' + emailCheck);

      if (emailCheck == 1) {
        console.log(usersEmail);
        setCurrentUser(usersEmail?.[0]);

        navigation.navigate('Main');
      } else if (emailCheck == 0) {
        navigation.navigate('Signin', { user: userIn });
      }
    }
  }, [email, emailCheck, loading]);

  return (
    <View style={S.container}>
      <Text style={S.title}>Log In</Text>

      <View style={S.container}>
        {clicked && emailCheck != 1 && (
          <View style={S.container2}>
            <Progress.Circle size={30} indeterminate={true} />
          </View>
        )}
        <TouchableOpacity
          style={S.signInButton}
          onPress={() => signInWithKakao()}
        >
          <Image
            source={require('../../../shared/assets/images/login-kakao.png')}
            style={S.signInButton}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={S.signInButton}
          onPress={() => LogInWithGoogle()}
        >
          <Image
            source={require('../../../shared/assets/images/login-google.jpg')}
            style={S.signInButton}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
