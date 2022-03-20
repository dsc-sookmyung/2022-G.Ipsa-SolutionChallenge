import React, { FC } from 'react';
import { View } from 'react-native';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';

import S from './Styles';
import MyText from '../MyText';
import { colors } from 'shared/utils/colors';

export interface MyHeaderProps extends BottomTabHeaderProps {}

const MyTabHeader: FC<MyHeaderProps> = ({
  navigation,
  route,
  options,
}: MyHeaderProps) => {
  const title = getHeaderTitle(options, route.name);

  return (
    <View style={S.container}>
      <MyText
        fontWeight="bold"
        fontSize={24}
        color={title === 'Home' ? colors.primary : colors.gray11}
      >
        {title === 'Home' ? 'BIND' : title}
      </MyText>
    </View>
  );
};

export default MyTabHeader;
