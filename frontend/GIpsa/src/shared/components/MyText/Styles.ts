import styled, { css } from 'styled-components/native';

export const MyText = styled.Text<{
  fontWeight: 'bold' | 'medium' | 'regular' | 'light';
  fontSize: number;
  color: string;
  font: 'Noto' | 'Suit';
}>`
  font-family: ${({ fontWeight, font }) =>
    `${fonts[font]}${weights[fontWeight]}`};
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ color }) => color};
  line-height: ${({ fontSize }) => fontSize + 4}px;
`;

const fonts = {
  Noto: 'NotoSansKR',
  Suit: 'SUIT',
};

const weights = {
  bold: 'Bold',
  medium: 'Medium',
  regular: 'Regular',
  light: 'Light',
};
