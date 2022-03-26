import React, { FC } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { MyText } from 'shared/components';
import { colors } from 'shared/utils/colors';

export interface CategorySelectProps {
  category?: string;
  onPress: () => void;
}

const CategorySelect: FC<CategorySelectProps> = ({
  category,
  onPress,
}: CategorySelectProps) => {
  return (
    <Root activeOpacity={0.9} onPress={onPress}>
      <MyText color={colors.primary} fontWeight="regular">
        {category || 'Select Category'}
      </MyText>
      <FontAwesome name={'caret-down'} size={20} color={colors.primary} />
    </Root>
  );
};

export default CategorySelect;

const Root = styled.TouchableOpacity`
  margin-top: 24px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 36px;
  border: 1px solid ${colors.primary};
  color: ${colors.primary};

  padding: 0 12px;
  border-radius: 4px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  background-color: ${colors.background};
`;
