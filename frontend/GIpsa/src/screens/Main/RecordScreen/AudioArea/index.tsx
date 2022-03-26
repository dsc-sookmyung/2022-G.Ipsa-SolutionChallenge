import React, { FC } from 'react';
import { Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as S from './Styles';
import { MyText } from 'shared/components';
import { colors } from 'shared/utils/colors';

export interface AudioAreaProps {
  audioUri: string;
  setAudioUri: React.Dispatch<React.SetStateAction<string>>;
}

const AudioArea: FC<AudioAreaProps> = ({}: AudioAreaProps) => {
  return (
    <S.Root>
      <S.Buttons>
        <S.LeftSide>
          <S.Wrapper>
            <S.SideButton activeOpacity={0.8}>
              <FontAwesome name={'close'} size={30} color={colors.primary} />
            </S.SideButton>
            <MyText fontSize={14}>Cancel</MyText>
          </S.Wrapper>
        </S.LeftSide>

        <S.Wrapper>
          <S.CenterButton activeOpacity={0.8}>
            <FontAwesome name={'microphone'} size={48} color={colors.gray1} />
          </S.CenterButton>
          <MyText fontSize={14}>Record</MyText>
        </S.Wrapper>

        <S.RightSide>
          <S.Wrapper>
            <S.SideButton activeOpacity={0.8}>
              <FontAwesome name={'upload'} size={30} color={colors.primary} />
            </S.SideButton>
            <MyText fontSize={14}>Upload</MyText>
          </S.Wrapper>
        </S.RightSide>
      </S.Buttons>
    </S.Root>
  );
};

export default AudioArea;
