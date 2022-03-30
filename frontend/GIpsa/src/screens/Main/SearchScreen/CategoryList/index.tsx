import React, { FC } from 'react';
import { ListRenderItem } from 'react-native';

import { MyText } from 'shared/components';
import { categories, CategoryName } from 'shared/constants/category';
import { Category } from 'shared/types';
import { colors } from 'shared/utils/colors';

import * as S from './Styles';

export interface CategoryListProps {}

const CategoryList: FC<CategoryListProps> = ({}: CategoryListProps) => {
  return (
    <S.Root
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      columnWrapperStyle={{ marginBottom: 24 }}
    ></S.Root>
  );
};

const renderItem: ListRenderItem<Category> = ({ item }) => {
  const getBackgroundImage = () => {
    switch (item.title) {
      case CategoryName.SOCIAL_AND_CULTURE:
        return require('../../../../shared/assets/images/Social_and_culture.png');
      case CategoryName.COMEDY:
        return require('../../../../shared/assets/images/Comedy.png');
      case CategoryName.BUSINESS:
        return require('../../../../shared/assets/images/Business.png');
      case CategoryName.ART:
        return require('../../../../shared/assets/images/Art.png');
      case CategoryName.FAMILY:
        return require('../../../../shared/assets/images/Family.png');
      case CategoryName.MUSIC:
        return require('../../../../shared/assets/images/Music.png');
      case CategoryName.EDUCATION:
        return require('../../../../shared/assets/images/Education.png');
      case CategoryName.LEISURE:
        return require('../../../../shared/assets/images/Leisure.png');
      case CategoryName.SCIENCE:
        return require('../../../../shared/assets/images/Science.png');
      case CategoryName.SLEEP:
        return require('../../../../shared/assets/images/Sleep.png');
      case CategoryName.SPORTS:
        return require('../../../../shared/assets/images/Sports.png');
      case CategoryName.HEALTH:
        return require('../../../../shared/assets/images/Health.png');
    }
  };

  return (
    <S.CategotyCard>
      <S.ImgBack source={getBackgroundImage()}>
        <MyText fontSize={14} fontWeight="medium" color={colors.gray1}>
          {item.title}
        </MyText>
      </S.ImgBack>
    </S.CategotyCard>
  );
};

export default CategoryList;
