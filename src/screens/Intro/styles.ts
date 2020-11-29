import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.Image`
  width: 100%;
  /* object-fit: cover; */
  flex: 1;
`;

export const WelcomeBox = styled.View`
  padding: 20px 30px ${Platform.OS === 'ios' ? 40 : 120}px;
  width: 100%;

  background: #34885e;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const Title = styled.Text`
  font-family: 'space-mono';
  font-size: 28px;
  color: white;
  text-align: center;
`;

export const Title2 = styled.Text`
  font-family: 'space-mono';
  font-size: 20px;
  color: white;
  text-align: center;
`;

export const SubTitle = styled.Text`
  font-family: 'space-mono';
  font-size: 16px;
  color: white;
  margin: 20px 0;
`;

export const SubTitle2 = styled.Text`
  font-family: 'space-mono';
  font-size: 16px;
  color: white;
`;
