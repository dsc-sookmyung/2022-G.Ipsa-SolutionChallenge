import { View, Text, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import S from './Styles';
import { MainTabScreenProps } from 'navigator/types';
import { GoogleSignin, GoogleSigninButton, statusCodes, User } from '@react-native-google-signin/google-signin';
import { isConditionalExpression } from 'typescript';


const LoginScreen = ({navigation}) => {

  useEffect(() => {
    configureGoogleSign();
  }, []);

  function configureGoogleSign() {
    GoogleSignin.configure({
      webClientId: '',
      offlineAccess: false
    });
  }

  const [userInfo, setUserInfo] = useState<User>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<Error>();

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

  const LogInWithGoogle = async() => {

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      setIsLoggedIn(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        Alert.alert('Process Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        Alert.alert('Process in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        Alert.alert("Play services are not available");
      } else {
        // some other error
        Alert.alert('Something else went wrong... ', error.toString());
        setError(error);
      }
      // Alert.alert('Something else went wrong... in googlesignin');
      // console.log(error);
    }
  }



  // {
  //   idToken: string,
  //   serverAuthCode: string,
  //   scopes: Array<string>, // on iOS this is empty array if no additional scopes are defined
  //   user: {
  //     email: string,
  //     id: string,
  //     givenName: string,
  //     familyName: string,
  //     photo: string, // url
  //     name: string // full name
  //   }
  // }

  return (
    <View style={S.container}>
      <Text style={S.title}>LoginScreen</Text>

      <GoogleSigninButton
        style={S.signInButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => LogInWithGoogle()}
      />

      <Text>{userInfo?.user.email}</Text>
      {isLoggedIn === false ? (
          <Text>You must sign in!</Text>
      ) : (
          <Button onPress={() => signOut()} title='Sign out' color='#332211' />
      )}

      <Button title="Go Signin" onPress={() => navigation.navigate('Signin')} />
    </View>
  );
};

export default LoginScreen;


