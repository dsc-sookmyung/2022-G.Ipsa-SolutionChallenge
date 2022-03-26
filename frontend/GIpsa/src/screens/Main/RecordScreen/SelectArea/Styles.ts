import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { colors } from 'shared/utils/colors';

export const Root = styled.View`
  width: 100%;
  height: 360px;
`;

export const Background = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 36px 24px;
  justify-content: space-between;
`;

export const Buttons = styled.View`
  justify-content: space-between;
`;

export const ImageButtons = styled.View`
  flex-direction: row;
  justify-content: space-between; ;
`;

export const RandomButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  background-color: ${colors.background};
  border: 2px solid ${colors.primary};
  height: 36px;
  width: 144px;
`;

export const SelectImageButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  background-color: ${colors.primary};
  height: 36px;
  width: 144px;
`;

export const DoneButton = styled.TouchableOpacity`
  margin-top: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  background-color: ${colors.primary};
  height: 36px;
  width: 100%;
`;
