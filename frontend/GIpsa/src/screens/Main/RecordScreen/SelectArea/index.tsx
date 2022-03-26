import React, { FC, useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import * as S from './Styles';
import { MyText, MyTextInput } from 'shared/components';
import { Category } from 'shared/types';
import CategorySelect from './CategorySelect';
import CategotySelectModal from './CategorySelectModal/Index';
import { colors } from 'shared/utils/colors';

export interface SelectAreaProps {
  title: string;
  imageUri: string;
  audioUri: string;
  selectedCategory: Category | undefined;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setImageUri: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<Category | undefined>
  >;
  isFinished: boolean;
}

const SelectArea: FC<SelectAreaProps> = ({
  title,
  setTitle,
  imageUri,
  setImageUri,
  selectedCategory,
  setSelectedCategory,
  isFinished,
}: SelectAreaProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePress = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleImageSelect = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      const uri = result.assets?.[0].uri || imageUri;
      setImageUri(uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.Root>
      <S.Background
        source={
          !imageUri ? require('./default-profile.jpg') : { uri: imageUri }
        }
      >
        <S.Container>
          <View>
            <MyTextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Enter the title"
            />
            <CategorySelect
              category={selectedCategory?.title || 'Select Category'}
              onPress={handlePress}
            />
          </View>
          <S.Buttons>
            <S.ImageButtons>
              <S.RandomButton activeOpacity={0.9}>
                <MyText fontWeight="regular" color={colors.primary}>
                  Random select
                </MyText>
              </S.RandomButton>
              <S.SelectImageButton
                activeOpacity={0.9}
                onPress={handleImageSelect}
              >
                <MyText fontWeight="regular" color={colors.gray1}>
                  Select Image
                </MyText>
              </S.SelectImageButton>
            </S.ImageButtons>

            {isFinished && (
              <S.DoneButton activeOpacity={0.9}>
                <MyText fontWeight="regular" color={colors.gray1}>
                  Done
                </MyText>
              </S.DoneButton>
            )}
          </S.Buttons>
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
