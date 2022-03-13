import React, { FC } from 'react';
import { Text } from 'react-native';

import * as S from './Styles';

export interface MyTextProps {
  children: React.ReactNode;
  fontWeight?: 'bold' | 'medium' | 'regular' | 'light';
  fontSize?: number;
  color?: string;
}

const MyText: FC<MyTextProps> = ({
  children,
  fontWeight = 'regular',
  fontSize = 16,
  color = 'black',
}: MyTextProps) => {
  return (
    <S.MyText fontWeight={fontWeight} fontSize={fontSize} color={color}>
      {children}
    </S.MyText>
  );
};

export default MyText;
