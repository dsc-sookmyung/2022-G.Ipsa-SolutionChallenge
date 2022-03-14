import { StyleSheet } from 'react-native';
import { colors } from 'shared/utils/colors';
import styled from 'styled-components/native';

export const Root = styled.View`
  position: relative;
  width: 100%;
  height: 40px;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  padding: 10px 30px;
  border-radius: 20px;
  border: 2px solid ${colors.primary};
  font-family: NotoSansKRRegular;
  line-height: 20px;
`;

export const IconWrapper = styled.View`
  position: absolute;
  top: 10;
  right: 20;
`;
