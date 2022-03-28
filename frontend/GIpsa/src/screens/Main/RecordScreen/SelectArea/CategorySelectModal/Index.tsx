import React, { FC } from 'react';
import { Modal, Text, View } from 'react-native';

import * as S from './Styles';
import { categories } from 'shared/constants/category';
import { Category } from 'shared/types';
import CategoryChip from './CategoryChip';
import { MyText } from 'shared/components';
import { colors } from 'shared/utils/colors';

export interface CategotySelectModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCategory: Category | undefined;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<Category | undefined>
  >;
}

const CategotySelectModal: FC<CategotySelectModalProps> = ({
  visible,
  onClose,
  selectedCategory,
  setSelectedCategory,
}: CategotySelectModalProps) => {
  const onPress = (category: Category) => () => {
    setSelectedCategory(category);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <S.BottomView>
        <S.BottomModal>
          <S.Title>
            <MyText fontSize={24} fontWeight="bold" color={colors.primary}>
              Select Category
            </MyText>
          </S.Title>
          <S.CategoryWrapper>
            {categories.map((category) => (
              <CategoryChip
                key={category.id}
                name={category.title}
                selected={selectedCategory?.id === category.id}
                onPress={onPress(category)}
              />
            ))}
          </S.CategoryWrapper>
        </S.BottomModal>
      </S.BottomView>
    </Modal>
  );
};

export default CategotySelectModal;
