import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import CheckBox from '@react-native-community/checkbox';

import S from './Styles';
import { NickNameInput, DateInput } from '../../../theme/navigation';

const SigninScreen = ({ navigation }) => {
  const [nickName, setNickName] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [isSenior, setIsSenior] = useState(false);

  useEffect(() => {
    if (Number(year) <= 1972 && Number(year) >= 1900) {
      setIsSenior(true);
    } else {
      setIsSenior(false);
    }
    console.log('year!!: ' + year);
    console.log('isSenior!!: ' + isSenior);
  }, [year]);

  const yeartyped = (y: string) => {
    setYear(y);
  };
  const monthtyped = (m: string) => {
    setMonth(m);
  };
  const daytyped = (d: string) => {
    setDay(d);
  };

  // Is CheckBox selected?
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={S.container}>
      <Text style={S.title}>Join</Text>
      <Text style={S.marginNn}>Nickname</Text>
      <NickNameInput
        style={S.marginNnInput}
        onChangeText={(nickName) => setNickName(nickName)}
        placeholder="Enter nickname..."
      />
      <Text style={S.marginavail}>available</Text>
      <Text style={S.marginB}>Birth</Text>

      <View style={S.dateAlign}>
        <DateInput style={S.tinputYear} onChangeText={yeartyped} />
        <DateInput style={S.tinputMonth} onChangeText={monthtyped} />
        <DateInput style={S.tinputDay} onChangeText={daytyped} />
      </View>

      {isSenior && (
        <View style={S.area}>
          <Text style={S.textQ}>Do you want to make contents as a story teller?</Text>
          <View style={S.checkAlign}>
            <CheckBox
              value={isChecked}
              onValueChange={(val) => setIsChecked(val)}
            />
            <Text>Yes, I want to share my story</Text>
          </View>
        </View>

      )}

      <TouchableOpacity style={S.startbtntouch}
        onPress={() => navigation.navigate('Main')}>
        <Image source={require('../../../shared/assets/images/start-bind.jpg')}
          style={S.startbtn} />
      </TouchableOpacity>

    </View>
  );
};

export default SigninScreen;
