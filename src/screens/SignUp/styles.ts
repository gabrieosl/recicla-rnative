import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: stretch;
  padding: 0 30px ${Platform.OS === 'ios' ? 40 : 120}px;
`;

export const Background = styled.Image`
  width: 100%;
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #34885e;
  font-family: 'space-mono';

  margin: 64px 0 24px;
`;
