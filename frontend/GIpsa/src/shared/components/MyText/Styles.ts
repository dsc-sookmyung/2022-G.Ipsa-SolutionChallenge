import styled, { css } from 'styled-components/native';

export const MyText = styled.Text<{
  fontWeight?: 'bold' | 'medium' | 'regular' | 'light';
  fontSize: number;
  color: string;
}>`
  font-family: ${({ fontWeight }) =>
    fontWeight === 'bold'
      ? 'NotoSansKRBold'
      : fontWeight === 'medium'
      ? 'NotoSansKRMedium'
      : fontWeight === 'regular'
      ? 'NotoSansKRRegular'
      : 'NotoSansKRLight'};
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ color }) => color};
  line-height: ${({ fontSize }) => fontSize + 4}px;
`;
