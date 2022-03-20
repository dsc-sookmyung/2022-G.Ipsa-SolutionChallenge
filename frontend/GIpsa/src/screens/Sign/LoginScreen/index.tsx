import {
  View,
  Text,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import S from './Styles';
import { MainTabScreenProps } from 'navigator/types';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User as GUser,
} from '@react-native-google-signin/google-signin';
import { isConditionalExpression } from 'typescript';
import {
  getProfile,
  KakaoOAuthToken,
  KakaoProfile,
  KakaoProfileNoneAgreement,
  login,
  logout,
} from '@react-native-seoul/kakao-login';

import { User } from 'shared/types';
import { useUsersEmail } from 'shared/hook/useUsersEmail';
import { useECheck } from 'shared/hook/useECheck';
import * as Progress from 'react-native-progress';

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

  const [userInfo, setUserInfo] = useState<GUser>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<Error>();
  const [email, setEmail] = useState('');
  const { usersEmail } = useUsersEmail(email);
  const [userIn, setUserIn] = useState<User>();
  const [clicked, setClicked] = useState(false);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setIsLoggedIn(false);
    } catch (error) {
      Alert.alert('Something else went wrong... ');
      console.log(error);
    }
  };

  const LogInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const GuserInfo = await GoogleSignin.signIn();
      setUserInfo(GuserInfo);
      setIsLoggedIn(true);
      setClicked(true);
      setEmail(GuserInfo?.user.email);
      const user: User = {
        email: GuserInfo?.user.email,
        profileImageSrc: GuserInfo?.user.photo as string,

        birth: new Date(),
        showBirth: false,
        isCreator: false,
        nickname: '',
      };
      setUserIn(user);
    } catch (error) {
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
      // Alert.alert('Something else went wrong... in googlesignin');
      // console.log(error);
    }
  };

  // google User
  // {
  //   idToken: string,
  //   serverAuthCode: string,
  //   scopes: Array<string>, // on iOS this is empty array if no additional scopes are defined
  //   user: {}
  //     email: string,
  //     id: string,
  //     givenName: string,
  //     familyName: string,
  //     photo: string, // url
  //     name: string // full name
  //   }
  // }

  // */ google

  // /* kakao

  const [userInfoKakao, setUserInfoKakao] = useState<KakaoProfile>();
  const [isLoggedInKakao, setIsLoggedInKakao] = useState(false);

  const { emailCheck } = useECheck(email);

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    setIsLoggedInKakao(true);
    getKakaoProfile();
    // setUserInfoKakao(JSON.stringify(token));
  };
  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();
    setIsLoggedInKakao(false);
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
    if (userIn) {
      console.log('email: ' + email);
      console.log('emailCheck: ' + emailCheck);
      console.log(usersEmail);

      if (emailCheck == 1) {
        global.User = usersEmail;
        navigation.navigate('Main');
      } else if (emailCheck == 0) {
        navigation.navigate('Signin', { user: userIn });
      }
    }
  }, [email, emailCheck]);

  //   type KakaoProfile = {
  //     id: string;
  //     email: string;
  //     nickname: string;
  //     profileImageUrl: string;
  //     thumbnailImageUrl: string;
  //     phoneNumber: string;
  //     ageRange: string;
  //     birthday: string;
  //     birthdayType: string;
  //     birthyear: string;
  //     gender: string;
  //     isEmailValid: boolean;
  //     isEmailVerified: boolean;
  //     isKorean: boolean;
  //     ageRangeNeedsAgreement?: boolean | undefined;
  //     ... 6 more ...;
  //     profileNeedsAgreement?: boolean | undefined;
  // }

  // */ kakao

  // 구글 제공 로그인 버튼
  // <GoogleSigninButton
  //   style={S.signInButton}
  //   size={GoogleSigninButton.Size.Wide}
  //   color={GoogleSigninButton.Color.Dark}
  //   onPress={() => LogInWithGoogle()}
  // />

  // 구글 유저 정보 및 sign out
  // <View style={S.container}>
  //   <Text>google: {userInfo?.user.email}</Text>

  //   {isLoggedIn === false ? (
  //     <Text>You must google sign in!</Text>
  //   ) : (
  //     <Button
  //       onPress={() => signOut()}
  //       title="Sign out Google"
  //       color="#332211"
  //     />
  //   )}
  // </View>

  // 카카오 유저 정보 및 sign out
  // <View style={S.container}>
  //   <Text>kakao: {(userInfoKakao as KakaoProfile)?.email}</Text>
  //   {isLoggedInKakao === false ? (
  //     <Text>You must kakao sign in!</Text>
  //   ) : (
  //     <Button
  //       onPress={() => signOutWithKakao()}
  //       title="Sign out Kakao"
  //       color="#332211"
  //     />
  //   )}
  // </View>
  // signin 페이지로 이동
  //  <Button title="Go Signin" onPress={() => navigation.navigate('Signin')} />

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
