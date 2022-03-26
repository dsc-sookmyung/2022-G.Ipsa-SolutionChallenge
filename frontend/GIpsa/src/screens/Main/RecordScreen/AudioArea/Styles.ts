import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { colors } from 'shared/utils/colors';

export const Root = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Buttons = styled.View`
  margin-top: 4px;
  flex-direction: row;
  align-items: flex-end;
`;

export const Wrapper = styled.View`
  align-items: center;
`;

export const CenterButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${colors.primary};
  height: 72px;
  width: 72px;
  margin-bottom: 12px;
`;

export const SideButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${colors.background};
  border: 2px solid ${colors.primary};
  height: 56px;
  width: 56px;
  margin-bottom: 12px;
`;

export const LeftSide = styled.View`
  position: absolute;
  left: -80px;
`;

export const RightSide = styled.View`
  position: absolute;
  right: -80px;
`;
