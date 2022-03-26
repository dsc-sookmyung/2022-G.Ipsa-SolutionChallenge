import { View, Text, Button } from 'react-native';
import React from 'react';

const RecordScreen = ({ navigation }) => {
  return (
    <View>
      <Text>RecordScreen</Text>
      <Button
        title="Go to ListenScreen"
        onPress={() => navigation.navigate('ListenScreen')}
      />
    </View>
  );
};

export default RecordScreen;
