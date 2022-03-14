import { View, Text } from 'react-native';
import React, { useState } from 'react';

import S from './Styles';
import SearchInput from './SearchInput';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <View style={S.container}>
      <SearchInput value={searchText} onChangeText={setSearchText} />
    </View>
  );
};

export default SearchScreen;
