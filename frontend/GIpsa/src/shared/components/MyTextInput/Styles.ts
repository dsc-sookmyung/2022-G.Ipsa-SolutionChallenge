import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { colors } from 'shared/utils/colors';

export const Root = styled.TextInput`
  height: 36px;
  border: 1px solid ${colors.gray11};
  color: ${colors.gray11};
  font-size: 16px;
  padding: 0 12px;
  border-radius: 4px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  background-color: ${colors.background};
  font-family: NotoSansKRRegular;
  line-height: 22px;
`;
