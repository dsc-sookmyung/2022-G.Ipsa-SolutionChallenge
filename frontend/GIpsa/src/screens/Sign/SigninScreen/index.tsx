import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import S from './Styles';
import { NickNameInput, DateInput } from '../../../theme/navigation';
import { Checkbox } from 'react-native-paper';

const SigninScreen = ({ navigation}) => {

  const [nickName, setNickName]=useState("")
  const [year, setYear]=useState("")
  const [month, setMonth]=useState("")
  const [day, setDay]=useState("")
  const [isSenior, setIsSenior]=useState(false)

  useEffect(()=>{
    
    if(Number(year)<=1972 && Number(year)>=1900){
      setIsSenior(true)
    }
    else{
      setIsSenior(false)
    }
    console.log("year!!: "+year)
    console.log("isSenior!!: "+isSenior)

  },[year])


  const yeartyped=(y:string)=>{
    setYear(y)
  }
  const monthtyped=(m:string)=>{
    setMonth(m)
  }
  const daytyped=(d:string)=>{
    setDay(d)
  }

  // 시니어 중 체크박스 누름
  const [isChecked, setIsChecked]=useState(false)
  

  return (
    <View style={S.container}>
      <Text style={S.title}>SigninScreen</Text>
      <Text>nickname</Text>
      <NickNameInput style={S.defaultMargin}
        onChangeText={(nickName)=>setNickName(nickName)}
        placeholder="Enter nickname..."/>
      <Text style={S.defaultMargin}>birth</Text>

      <View style={S.dateAlign}>
        <DateInput 
          onChangeText={yeartyped}/>
        <Text>year</Text>
        <DateInput 
          onChangeText={monthtyped}
          />
        <Text>month</Text>
        <DateInput 
          onChangeText={daytyped}
          />
        <Text>day</Text>
      </View>

      {isSenior && 
      <View style={S.dateAlign}>
        <CheckBox 
          value={isChecked}
          onValueChange={(val)=>setIsChecked(val)}
        />
        <Text>more than 50~</Text>
        <Text>Is CheckBox selected: {isChecked ? "yep" : "nope"}</Text>
      </View>
      }

      <Button title="Go Main" onPress={() => navigation.navigate('Main')} />
    </View>
  );
};

export default SigninScreen;

