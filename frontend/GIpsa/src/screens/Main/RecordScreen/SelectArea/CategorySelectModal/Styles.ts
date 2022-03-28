import styled from 'styled-components/native';

import { colors } from 'shared/utils/colors';

export const Modal = styled.Modal``;

export const BottomView = styled.View`
  height: 100%;
  flex: 1;
  justify-content: flex-end;
  background-color: #00000077;
`;

export const BottomModal = styled.View`
  background-color: ${colors.background};
  padding: 36px 24px;
  border-top-left-radius: 48px;
  border-top-right-radius: 48px;
`;
export const Title = styled.View`
  align-items: center;
  justify-content: center;
`;

export const CategoryWrapper = styled.View`
  margin-top: 24px;
  flex-direction: row;
  flex-wrap: wrap;
`;
