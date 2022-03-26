import React, { FC, useState } from 'react';
import { Modal, Text, View } from 'react-native';

import * as S from './Styles';
import { MyTextInput } from 'shared/components';
import { Category } from 'shared/types';
import CategorySelect from './CategorySelect';
import CategotySelectModal from './CategorySelectModal/Index';

export interface SelectAreaProps {
  title: string;
  imageUri: string;
  selectedCategory: Category | undefined;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setImageUri: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<Category | undefined>
  >;
}

const SelectArea: FC<SelectAreaProps> = ({
  title,
  setTitle,
  imageUri,
  setImageUri,
  selectedCategory,
  setSelectedCategory,
}: SelectAreaProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePress = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <S.Root>
      <S.Background
        source={
          !imageUri ? require('./default-profile.jpg') : { uri: imageUri }
        }
      >
        <S.Container>
          <MyTextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter the title"
          />
          <CategorySelect
            category={selectedCategory?.title || 'Select Category'}
            onPress={handlePress}
          />
        </S.Container>
      </S.Background>

      <CategotySelectModal
        visible={isModalOpen}
        onClose={handleClose}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </S.Root>
  );
};

export default SelectArea;
