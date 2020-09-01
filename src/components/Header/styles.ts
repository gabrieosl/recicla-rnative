import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 40px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TitleContainer = styled.View``;

export const Title = styled.Text`
  font-size: 20px;
  color: #34885e;
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  color: #959595;
`;

export const LogoutButton = styled.TouchableOpacity`
  border-color: #494949;
  border-width: 1px;
  height: 25px;
  width: 60px;
  background: transparent;
  border-radius: 6px;

  justify-content: center;
  align-items: stretch;
`;

export const LogoutButtonText = styled.Text`
  font-size: 16px;
  color: #494949;
  text-align: center;
`;
