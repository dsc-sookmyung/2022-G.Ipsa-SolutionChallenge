import React, { FC, useState } from 'react';
import { Text, View } from 'react-native';
import { MyTextInput } from 'shared/components';
import { Category } from 'shared/types';
import CategorySelect from './CategorySelect';

import * as S from './Styles';

export interface SelectAreaProps {
  title: string;
  imageUri: string;
  category: Category | undefined;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setImageUri: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<Category | undefined>>;
}

const SelectArea: FC<SelectAreaProps> = ({
  title,
  setTitle,
  imageUri,
  setImageUri,
  category,
  setCategory,
}: SelectAreaProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePress = () => {
    setIsModalOpen(true);
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
          <CategorySelect category={category?.name} onPress={handlePress} />
        </S.Container>
      </S.Background>
    </S.Root>
  );
};

export default SelectArea;
