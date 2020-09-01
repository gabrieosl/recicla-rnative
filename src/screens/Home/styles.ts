import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: stretch;
  justify-content: space-around;
  flex: 1;

  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #173e2a;
  text-align: center;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  background: #34885e;
  border-radius: 10px;
  padding: 20px;

  align-items: center;
`;

export const SubmitText = styled.Text`
  font-size: 24px;
  color: #fff;
`;

export const SubmitCalcText = styled.Text`
  font-size: 14px;
  color: #d3d3d3;
`;

export const Image = styled.Image`
  width: 100%;
  height: 400px;
`;
