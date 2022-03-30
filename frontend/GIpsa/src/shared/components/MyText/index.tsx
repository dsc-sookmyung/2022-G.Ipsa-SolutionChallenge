import React, { FC } from 'react';
import { StyleProp, TextPropTypes, TextStyle } from 'react-native';
import { colors } from 'shared/utils/colors';

import * as S from './Styles';

export type MyTextProps = {
  children: React.ReactNode;
  fontWeight?: 'bold' | 'medium' | 'regular' | 'light';
  fontSize?: number;
  color?: string;
  font?: 'Noto' | 'Suit';
  style?: StyleProp<TextStyle> | undefined;
};

const MyText: FC<MyTextProps> = ({
  children,
  fontWeight = 'medium',
  fontSize = 16,
  color = colors.gray11,
  font = 'Noto',
  style,
}: MyTextProps) => {
  return (
    <S.MyText
      font={font}
      fontWeight={fontWeight}
      fontSize={fontSize}
      color={color}
      style={style}
    >
      {children}
    </S.MyText>
  );
};

export default MyText;
