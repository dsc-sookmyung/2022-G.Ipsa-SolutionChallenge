import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import CheckBox from '@react-native-community/checkbox';

import S from './Styles';
import { NickNameInput, DateInput } from '../../../theme/navigation';

import { User } from 'shared/types';
import { isConditionalExpression } from 'typescript';

import { useNnCheck } from 'shared/hook/useNnCheck';
import { useUsers } from 'shared/hook/useUsers';
import { LogBox } from 'react-native';
import { API_ENDPOINT } from 'shared/constants/env';

LogBox.ignoreLogs(['EventEmitter.removeListener']);
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const SigninScreen = ({ route, navigation }) => {
  const [nickName, setNickName] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [isSenior, setIsSenior] = useState(false);

  const user: User = route.params.user;

  //  id?: number;
  //  email: string;
  //  birth: Date;
  //  showBirth: boolean;
  //  isCreator: boolean;
  //  nickname: string;
  //  profileImageSrc: string;

  useEffect(() => {
    user.birth = new Date(year + '-' + month + '-' + day);

    if (Number(year) <= 1972 && Number(year) >= 1900) {
      setIsSenior(true);
    } else {
      setIsSenior(false);
    }
  }, [year, month, day]);

  const yeartyped = (y: string) => {
    setYear(y);
  };
  const monthtyped = (m: string) => {
    if (m.length < 2) {
      m = '0' + m;
    }
    setMonth(m);
  };
  const daytyped = (d: string) => {
    if (d.length < 2) {
      d = '0' + d;
    }
    setDay(d);
  };

  // Is CheckBox selected?
  const [isChecked, setIsChecked] = useState(false);
  const [availNn, setAvailNn] = useState(true);

  useEffect(() => {
    user.isCreator = isChecked;
  }, [isChecked]);

  const { nicknameCheck } = useNnCheck(nickName);

  useEffect(() => {
    console.log('nickName: ' + nickName);
    console.log('nicknameCheck: ' + nicknameCheck);
    if (nicknameCheck == 1) {
      setAvailNn(false);
    } else if (nicknameCheck == 0) {
      setAvailNn(true);
      user.nickname = nickName;
    }
    user.nickname = nickName;
  }, [nicknameCheck, nickName]);

  // tester, jaehyun

  const onPressGoMain = () => {
    let options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    };

    fetch(API_ENDPOINT + `/user/signin`, options)
      .then((response) => {
        return response
          .text()
          .then((responseJson) => {
            const data = responseJson;
            console.log('data: \n' + data);
          })
          .catch((error) => {
            console.log('error: \n' + error);
          });
      })
      .catch((error) => {
        console.log('Fetch Error: \n', error);
      });

    console.log('user: ' + JSON.stringify(user));
    navigation.navigate('Main');
  };

  return (
    <View style={S.container}>
      <Text style={S.title}>Join</Text>
      <Text style={S.marginNn}>Nickname</Text>
      <NickNameInput
        style={S.marginNnInput}
        onChangeText={(nickName) => setNickName(nickName)}
        placeholder="Enter nickname..."
      />
      {availNn ? (
        <Text style={S.marginavail}>available</Text>
      ) : (
        <Text style={S.marginavailred}>not available</Text>
      )}
      <Text style={S.marginB}>Birth</Text>

      <View style={S.dateAlign}>
        <DateInput style={S.tinputYear} onChangeText={yeartyped} />
        <DateInput style={S.tinputMonth} onChangeText={monthtyped} />
        <DateInput style={S.tinputDay} onChangeText={daytyped} />
      </View>

      {isSenior && (
        <View style={S.area}>
          <Text style={S.textQ}>
            Do you want to make contents as a story teller?
          </Text>
          <View style={S.checkAlign}>
            <CheckBox
              value={isChecked}
              onValueChange={(val) => setIsChecked(val)}
            />
            <Text>Yes, I want to share my story</Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={S.startbtntouch} onPress={onPressGoMain}>
        <Image
          source={require('../../../shared/assets/images/start-bind.jpg')}
          style={S.startbtn}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SigninScreen;
