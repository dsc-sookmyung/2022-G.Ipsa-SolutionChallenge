import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { MyText } from 'shared/components';
import { Category } from 'shared/types';
import { colors } from 'shared/utils/colors';
import styled from 'styled-components/native';

export interface CategoryChipProps {
  name: string;
  selected: boolean;
  onPress: () => void;
}

const CategoryChip: FC<CategoryChipProps> = ({
  name,
  selected,
  onPress,
}: CategoryChipProps) => {
  return (
    <Chip
      backgroundColor={selected ? colors.primary : colors.background}
      onPress={onPress}
    >
      <MyText fontSize={14} color={selected ? colors.gray1 : colors.gray11}>
        {name}
      </MyText>
    </Chip>
  );
};

export default CategoryChip;

const Chip = styled.TouchableOpacity<{ backgroundColor: string }>`
  align-self: center;
  padding: 0 12px;
  border-radius: 12px;
  height: 26px;
  border: 1px solid ${colors.primary};
  background-color: ${({ backgroundColor }) => backgroundColor};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  margin-bottom: 12px;
`;
