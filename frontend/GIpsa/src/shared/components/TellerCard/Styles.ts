import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { colors } from 'shared/utils/colors';

export const Root = styled.View<{ direction: 'vertical' | 'horizontal' }>`
  flex: 1;
  flex-direction: ${({ direction }) =>
    direction === 'vertical' ? 'column' : 'row'};
  margin-right: 24px;
`;

export const Avatar = styled.Image`
  width: 56px;
  height: 56px;
`;
