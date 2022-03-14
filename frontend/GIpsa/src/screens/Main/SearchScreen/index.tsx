import { View, Text } from 'react-native';
import React, { useState } from 'react';

import S from './Styles';
import SearchInput from './SearchInput';
import CategoryList from './CategoryList';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <View style={S.container}>
      <SearchInput value={searchText} onChangeText={setSearchText} />
      <CategoryList />
    </View>
  );
};

export default SearchScreen;
