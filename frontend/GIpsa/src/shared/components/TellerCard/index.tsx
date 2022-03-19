import React, { FC } from 'react';
import { Image, Text, View } from 'react-native';

import * as S from './Styles';
import { User } from 'shared/types';
import MyText from '../MyText';

export interface TellerCardProps {
  teller: User;
  direction: 'vertical' | 'horizontal';
}

const TellerCard: FC<TellerCardProps> = ({
  teller,
  direction,
}: TellerCardProps) => {
  return (
    <S.Root direction={direction}>
      <Image source={{ uri: teller.profileImageSrc }} />
      <MyText>{teller.nickname}</MyText>
    </S.Root>
  );
};

export default TellerCard;
