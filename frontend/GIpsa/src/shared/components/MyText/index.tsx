import React, { FC } from 'react';
import { Text } from 'react-native';
import { colors } from 'shared/utils/colors';

import * as S from './Styles';

export interface MyTextProps {
  children: React.ReactNode;
  fontWeight?: 'bold' | 'medium' | 'regular' | 'light';
  fontSize?: number;
  color?: string;
  font?: 'Noto' | 'Suit';
}

const MyText: FC<MyTextProps> = ({
  children,
  fontWeight = 'regular',
  fontSize = 16,
  color = colors.gray11,
  font = 'Noto',
}: MyTextProps) => {
  return (
    <S.MyText
      font={font}
      fontWeight={fontWeight}
      fontSize={fontSize}
      color={color}
    >
      {children}
    </S.MyText>
  );
};

export default MyText;
