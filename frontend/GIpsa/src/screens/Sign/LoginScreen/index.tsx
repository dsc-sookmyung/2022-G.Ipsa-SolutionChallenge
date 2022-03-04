import { View, Text, Button } from 'react-native';
import React from 'react';
import S from './Styles';
import { MainTabScreenProps } from 'navigator/types';


const LoginScreen = ({navigation}) => {
  return (
    <View style={S.container}>
      <Text style={S.title}>LoginScreen</Text>
      <Button title="Go Signin" onPress={() => navigation.navigate('Signin')} />
    </View>
  );
};

export default LoginScreen;


