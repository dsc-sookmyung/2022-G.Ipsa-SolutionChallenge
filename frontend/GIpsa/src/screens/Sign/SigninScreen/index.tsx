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

import UserProvider, { useCurrentUser } from 'src/provider/UserProvider';
import { MyText } from 'shared/components';

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
  const { setCurrentUser } = useCurrentUser();

  const user: User = route.params.user;

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
    if (nicknameCheck == 1) {
      setAvailNn(false);
    } else if (nicknameCheck == 0) {
      setAvailNn(true);
      user.nickname = nickName;
    }
    if (nickName == '') {
      setAvailNn(false);
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
          })
          .catch((error) => {
            console.log('error: \n' + error);
          });
      })
      .catch((error) => {
        console.log('Fetch Error: \n', error);
      });

    setCurrentUser(user);
    navigation.navigate('Main');
  };

  return (
    <View style={S.container}>
      <View style={S.title}>
        <MyText fontSize={30} fontWeight={'bold'}>
          Join
        </MyText>
      </View>

      <MyText fontSize={16}>Nickname</MyText>

      <NickNameInput
        style={S.marginNnInput}
        onChangeText={(nickName) => setNickName(nickName)}
        placeholder="Enter nickname..."
      />

      <View style={S.marginavail}>
        {availNn ? (
          <MyText fontSize={10}>available</MyText>
        ) : (
          <MyText fontSize={10} color={'red'}>
            not available
          </MyText>
        )}
      </View>

      <View style={S.marginB}>
        <MyText fontSize={16}>Birth</MyText>
      </View>

      <View style={S.dateAlign}>
        <DateInput
          style={S.tinputYear}
          onChangeText={yeartyped}
          placeholder="YYYY"
        />
        <DateInput
          style={S.tinputMonth}
          onChangeText={monthtyped}
          placeholder="MM"
        />
        <DateInput
          style={S.tinputDay}
          onChangeText={daytyped}
          placeholder="DD"
        />
      </View>

      {isSenior && (
        <View style={S.area}>
          <MyText fontSize={13}>
            Do you want to make contents as a story teller?
          </MyText>
          <View style={S.checkAlign}>
            <CheckBox
              value={isChecked}
              onValueChange={(val) => setIsChecked(val)}
            />
            <MyText fontSize={13}>Yes, I want to share my story</MyText>
          </View>
        </View>
      )}

      <TouchableOpacity style={S.startbtntouch} onPress={onPressGoMain}>
        {availNn ? (
          <Image
            source={require('../../../shared/assets/images/start-bind.png')}
            style={S.startbtn}
          />
        ) : (
          <Image
            source={require('../../../shared/assets/images/unstart-bind.png')}
            style={S.startbtn}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SigninScreen;
