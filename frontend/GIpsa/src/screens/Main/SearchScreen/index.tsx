import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';

import S from './Styles';
import SearchInput from './SearchInput';
import CategoryList from './CategoryList';
import StoryReselts from './StoryResults';
import TellerReselts from './TellerResults';

import { useStories } from 'shared/hook/useStories';
import { useUsers } from 'shared/hook/useUsers';
import PlayingBar from 'shared/components/PlayingBar';
import { usePlayingBarShow } from 'src/provider/PlayingBarProvider';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState<string>('');
  const { isPlayingBarShow } = usePlayingBarShow();

  const { stories } = useStories(searchText);
  const { users } = useUsers(searchText);

  return (
    <View style={S.container}>
      <SearchInput value={searchText} onChangeText={setSearchText} />
      {searchText === '' ? (
        <CategoryList />
      ) : (
        <ScrollView style={S.results}>
          <TellerReselts tellers={users} />
          <StoryReselts stories={stories} />
        </ScrollView>
      )}
      {isPlayingBarShow && <PlayingBar />}
    </View>
  );
};

export default SearchScreen;
