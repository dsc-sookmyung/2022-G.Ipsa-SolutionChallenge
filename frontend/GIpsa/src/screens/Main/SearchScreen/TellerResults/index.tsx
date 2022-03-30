import React, { FC } from 'react';

import * as S from './Styles';
import { User } from 'shared/types';
import { MyText, TellerCard } from 'shared/components';

export interface TellerReseltsProps {
  tellers: User[] | undefined;
}

const TellerReselts: FC<TellerReseltsProps> = ({
  tellers,
}: TellerReseltsProps) => {
  return (
    <S.Root>
      <MyText fontSize={24} fontWeight="bold">
        Teller
      </MyText>
      <S.TellerContainer horizontal>
        {tellers?.map((teller) => (
          <TellerCard key={teller.uid} teller={teller} direction="horizontal" />
        ))}
      </S.TellerContainer>
    </S.Root>
  );
};

export default TellerReselts;
