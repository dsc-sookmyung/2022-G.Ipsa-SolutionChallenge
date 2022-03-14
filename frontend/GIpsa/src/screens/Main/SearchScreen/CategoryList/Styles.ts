import { FlatList, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { colors } from 'shared/utils/colors';

export const Root = styled.FlatList`
  width: 100%;
  height: 100%;
  margin-top: 24px;
` as unknown as typeof FlatList;

export const CategotyCard = styled.View`
  width: 47%;
  height: 125px;
  margin-right: 6%;
  background: ${colors.gray7};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;
