import React, { FC } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from 'shared/utils/colors';

import * as S from './Styles';

export interface SearchInputProps {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder,
}: SearchInputProps) => {
  return (
    <S.Root>
      <S.Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        selectionColor={colors.primary}
      />
      <S.IconWrapper>
        <FontAwesome
          name={value ? 'times-circle' : 'search'}
          size={20}
          color={value ? colors.gray7 : colors.primary}
          onPress={value ? () => onChangeText('') : undefined}
        />
      </S.IconWrapper>
    </S.Root>
  );
};

export default SearchInput;
