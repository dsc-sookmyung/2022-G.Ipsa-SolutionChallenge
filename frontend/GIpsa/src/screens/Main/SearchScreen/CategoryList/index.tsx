import React, { FC } from 'react';
import { ListRenderItem, ListRenderItemInfo } from 'react-native';

import { MyText } from 'shared/components';
import { categories } from 'shared/constants/category';
import { colors } from 'shared/utils/colors';

import * as S from './Styles';

type Item = {
  id: number;
  title: string;
};

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

const renderItem: ListRenderItem<Item> = ({ item }) => {
  return (
    <S.CategotyCard>
      <MyText fontSize={14} fontWeight="medium" color={colors.gray1}>
        {item.title}
      </MyText>
    </S.CategotyCard>
  );
};

export default CategoryList;
