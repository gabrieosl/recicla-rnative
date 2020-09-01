import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #fff;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      border-color: #34885e;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #121212;
  font-size: 16px;
  font-family: 'space-mono';
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;