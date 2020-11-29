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
`;

export const StartDateMenu = styled.View`
  flex-direction: row;
  margin: 10px 0;
  height: 30px;
`;

interface StartDateOptionProps {
  isSelected: boolean;
}

export const StartDateOption = styled.TouchableOpacity<StartDateOptionProps>`
  margin-right: 10px;
  opacity: ${props => (props.isSelected ? 1 : 0.3)};
  border-bottom-color: ${props =>
    props.isSelected ? '#34885e' : 'transparent'};
  border-bottom-width: 1px;
`;

export const StartDateText = styled.Text`
  font-size: 14px;
  color: #34885e;
`;

export const Table = styled.View`
  width: 100%;
  margin: 20px 0;
`;

export const TableLine = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #99c3af;
  padding: 10px 0;
`;

export const PositionText = styled.Text`
  font-size: 16px;
  color: #34885e;
`;

export const NameText = styled.Text`
  font-size: 16px;
  padding: 0 4px;
  flex: 1;
`;

export const WeighText = styled.Text`
  font-size: 16px;
  width: 80px;
  text-align: right;
`;

export const ScoreText = styled.Text`
  font-size: 16px;
  width: 70px;
  text-align: right;
  color: #34885e;
`;

export const Image = styled.Image`
  width: 100%;
  height: 400px;
`;
