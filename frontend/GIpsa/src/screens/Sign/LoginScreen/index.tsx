import { View, Text, Button } from 'react-native';
import React from 'react';

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <Text>LoginScreen</Text>
      <Button title="Go Main" onPress={() => navigation.navigate('Main')} />
    </View>
  );
};

export default LoginScreen;
