import React, { FC } from 'react';
import { Text, View } from 'react-native';

import * as S from './Styles';

export interface MyTextInputProps {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const MyTextInput: FC<MyTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
}: MyTextInputProps) => {
  return (
    <S.Root
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
};

export default MyTextInput;
