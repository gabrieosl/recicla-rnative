import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonProps {
  variant: 'filled' | 'outlined';
  color: string;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  height: 60px;
  background: ${props =>
    props.variant === 'filled' ? props.color : 'transparent'};
  border-radius: 10px;
  margin-top: 8px;
  border: 1px solid ${props => props.color};

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text<ButtonProps>`
  font-family: 'space-mono';
  color: ${props => props.color};
  font-size: 16px;
`;
